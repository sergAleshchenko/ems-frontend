import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

class EmployeeService {

    getAllEmployees() {
        return axios.get(REST_API_BASE_URL);
    }

    createEmployee(employee) {
        return axios.post(REST_API_BASE_URL, employee);
    }

    getEmployeeById(employeeId) {
        return axios.get(REST_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employeeId, employee) {
        return axios.put(REST_API_BASE_URL + '/' + employeeId, employee);
    }
}

export default new EmployeeService();
