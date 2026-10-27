import {Link} from 'react-router-dom';
export default function HeaderComponent() {
    return <header className="ems-header"><nav aria-label="Основная навигация"><Link className="ems-brand" to="/employees"><span aria-hidden="true">✳</span> people club<span className="ems-brand-tag">EMS</span></Link><Link className="ems-nav-link" to="/employees">Команда <span aria-hidden="true">↗</span></Link></nav></header>;
}
