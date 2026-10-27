import {useEffect, useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const initials = (employee) => `${employee.firstName?.[0] || ''}${employee.lastName?.[0] || ''}`.toUpperCase() || '?';

export default function ListEmployeeComponent() {
    const [employees, setEmployees] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sort, setSort] = useState({key: 'name', direction: 'asc'});
    const load = () => {
        setLoading(true);
        setError('');
        EmployeeService.getAllEmployees().then(({data}) => setEmployees(data))
            .catch(() => setError('Не удалось загрузить сотрудников. Проверь подключение и попробуй ещё раз.'))
            .finally(() => setLoading(false));
    };
    useEffect(() => { load(); }, []);
    const filtered = useMemo(() => employees.filter(e =>
        `${e.firstName || ''} ${e.lastName || ''} ${e.email || ''} ${e.id}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()))
        .sort((a, b) => {
            const value = employee => sort.key === 'name'
                ? `${employee.firstName || ''} ${employee.lastName || ''}`
                : employee[sort.key] || '';
            const comparison = sort.key === 'id'
                ? Number(a.id) - Number(b.id)
                : value(a).localeCompare(value(b), 'ru', {sensitivity: 'base'});
            return (sort.direction === 'asc' ? comparison : -comparison) || Number(a.id) - Number(b.id);
        }), [employees, query, sort]);
    const toggleSort = key => setSort(current => ({
        key,
        direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
    const sortHeader = (key, label) => <th scope="col" key={key}
        aria-sort={sort.key === key ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none'}>
        <button className="people-sort" onClick={() => toggleSort(key)}
            aria-label={`${label}: сортировать по ${sort.key === key && sort.direction === 'asc' ? 'убыванию' : 'возрастанию'}`}>
            {label}<span className="people-sort-arrow" aria-hidden="true">{sort.key === key ? (sort.direction === 'asc' ? '↑' : '↓') : '↕'}</span>
        </button>
    </th>;
    return <main className="people-page">
        <div className="people-eyebrow">ТВОЯ КОМАНДА · ВСЕ НА МЕСТЕ</div>
        <section className="people-hero"><div><h1>Большие дела.<br/><span>Классные люди.</span> <span className="hero-star" aria-hidden="true">✳</span></h1><p>Имена, контакты и немного порядка — всё в одном месте.</p></div><Link className="people-primary" to="/add-employee"><span aria-hidden="true">＋</span> Добавить сотрудника</Link></section>
        <div className="people-summary"><div><span className="summary-icon" aria-hidden="true">☺</span><div><strong>{loading ? '…' : employees.length}</strong><span>сотрудников в команде</span></div></div><p>Каждый человек — важная часть команды <span aria-hidden="true">✦</span></p></div>
        <section className="people-panel" aria-label="Список сотрудников">
            <div className="people-toolbar"><div><h2>Все сотрудники <span>{employees.length}</span></h2><p>Найди нужного человека за пару секунд.</p></div><div className="people-tools"><label className="people-search"><span aria-hidden="true">⌕</span><input aria-label="Поиск сотрудников" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Имя, email или ID"/>{query && <button aria-label="Очистить поиск" onClick={()=>setQuery('')}>×</button>}</label></div></div>
            {error ? <div className="people-empty" role="alert"><span aria-hidden="true">☁</span><h3>Связь потерялась</h3><p>{error}</p><button className="people-primary" onClick={load}>Попробовать снова</button></div> : loading ? <div className="people-empty" role="status"><span className="loading-star" aria-hidden="true">✳</span><h3>Собираем команду…</h3></div> : filtered.length ? <div className="people-table-wrap"><table className="people-table"><thead><tr>{sortHeader('name', 'Сотрудник')}{sortHeader('email', 'Электронная почта')}{sortHeader('id', 'ID')}<th scope="col"><span className="visually-hidden">Действия</span></th></tr></thead><tbody>{filtered.map((e,i)=><tr key={e.id}><td><div className="person"><span className={`person-avatar color-${i%4}`} aria-hidden="true">{initials(e)}</span><div><strong>{e.firstName} {e.lastName}</strong><span>Участник команды</span></div></div></td><td><a className="person-email" href={`mailto:${e.email}`}>{e.email}</a></td><td><span className="person-id">#{String(e.id).padStart(3,'0')}</span></td><td className="person-action"><Link aria-label={`Редактировать ${e.firstName} ${e.lastName}`} to={`/edit-employee/${e.id}`}>Редактировать <span aria-hidden="true">↗</span></Link></td></tr>)}</tbody></table></div> : <div className="people-empty"><span aria-hidden="true">{query ? '⌕' : '👋'}</span><h3>{query ? 'Никого не нашли' : 'Познакомимся с командой?'}</h3><p>{query ? 'Попробуй другое имя, email или ID.' : 'Добавь первого сотрудника — и список оживёт.'}</p>{query ? <button className="people-primary" onClick={()=>setQuery('')}>Сбросить поиск</button> : <Link className="people-primary" to="/add-employee">Добавить сотрудника</Link>}</div>}
            <div className="people-panel-footer" aria-live="polite"><span>{loading ? 'Загрузка…' : error ? 'Данные недоступны' : `Показано ${filtered.length} из ${employees.length}`}</span><span>Маленький порядок. Большая разница. ✦</span></div>
        </section><footer className="people-footer"><span>EMS · PEOPLE FIRST</span><span>С заботой о твоей команде ♡</span></footer>
    </main>;
}
