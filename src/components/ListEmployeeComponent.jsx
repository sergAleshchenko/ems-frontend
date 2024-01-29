import React from 'react'

const ListEmployeeComponent = () => {

    const dummyData = [
        {
            "id": 1,
            "firstName":"Sergei",
            "lastName":"Aleshchenko",
            "email":"test@gmail.com"
        },
        {
            "id": 2,
            "firstName":"Ivan",
            "lastName":"Ivanov",
            "email":"ivan@gmail.com"
        },
        {
            "id": 3,
            "firstName":"Petr",
            "lastName":"Petrov",
            "email":"petr@gmail.com"
        }
    ]


    return (
        <div className='container'>

            <h2>LIst of Employees</h2>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email Id</th>
                    </tr>
                </thead>
                <tbody>
                {
                    dummyData.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
}
export default ListEmployeeComponent

