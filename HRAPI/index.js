const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',async(req,res)=>{
    try{
        res.json('Welcome To Project API')
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

app.get('/region',async(req,res)=>{
    try{
        const result = await pool.query('select * from regions');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

app.get('/country',async(req,res)=>{
    try{
        const result = await pool.query('select * from Countries');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

app.get('/NoOfEmployees',async(req,res)=>{
    try{
        const result = await pool.query('select count(employee_id) from employees');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

app.get('/NoOfDepartments',async(req,res)=>{
    try{
        const result = await pool.query('select count(department_id) from departments');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

app.get('/NoOfJob',async(req,res)=>{
    try{
        const result = await pool.query('select count(job_id) from jobs');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

app.get('/NoOflocations',async(req,res)=>{
    try{
        const result = await pool.query('select count(location_id) from locations');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

app.get('/NoOfRegions',async(req,res)=>{
    try{
        const result = await pool.query('select count(region_id) from regions');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});




app.get('/employee',async(req,res)=>{
    try{
       const result = await pool.query('select * from employees');
       res.json(result.rows);
    
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/Q50',async(req,res)=>{
    try{
       const result = await pool.query('select j.*,e.first_name,jj.job_title,c.country_name from employees e inner join job_history j on j.employee_id=e.employee_id join jobs jj on jj.job_id=j.job_id join departments d on e.department_id=d.department_id join locations l on l.location_id=d.location_id join countries c on c.country_id=l.country_id limit 3');
       res.json(result.rows);
    
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});




app.get('/departments',async(req,res)=>{
    try{
       const result = await pool.query('select * from departments');
       res.json(result.rows);
    
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/locations',async(req,res)=>{
    try{
       const result = await pool.query('select * from locations');
       res.json(result.rows);
    
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/Q51',async(req,res)=>{
    try{
       const result = await pool.query('select r.*,c.country_name,l.street_address from regions r join countries c on c.region_id=r.region_id join locations l on l.country_id=c.country_id limit 3');
       res.json(result.rows);
    
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/Q52', async (req, res) => {
    try {
        const result = await pool.query(`select r.*,c.country_name,l.street_address from regions r left outer join countries c on c.region_id=r.region_id join locations l on l.country_id=c.country_id limit 3`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/Q53', async (req, res) => {
    try {
        const result = await pool.query(`select r.*,c.country_name,l.street_address from locations l left outer join countries c on l.country_id=c.country_id join regions r on c.region_id=r.region_id limit 3`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/Q54', async (req, res) => {
    try {
        const result = await pool.query(`select d.*,e.first_name , l.street_address from departments d left outer join employees e on d.department_id=e.department_id left outer join locations l on d.location_id=l.location_id limit 3`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/Q55', async (req, res) => {
    try {
        const result = await pool.query(`select d.*,e.first_name , l.street_address,c.country_name from departments d left outer join employees e on d.department_id=e.department_id left outer join locations l on d.location_id=l.location_id join countries c on l.country_id=c.country_id limit 3`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/Q56', async (req, res) => {
    try {
        const result = await pool.query(`select e.employee_id,concat(m.first_name,' ',m.last_name) as MANAGER_NAME,d.department_name from employees e left outer join employees m on e.employee_id=m.employee_id join departments d on e.department_id=d.department_id join locations l on d.location_id=l.location_id limit 3`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/Q57', async (req, res) => {
    try {
        const result = await pool.query(`select e.*,j.job_title,d.department_name,l.city from employees e join jobs j on e.job_id=j.job_id join departments d on e.department_id=d.department_id join locations l on d.location_id=l.location_id limit 3`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/Q58', async (req, res) => {
    try {
        const result = await pool.query(`select e.employee_id,concat(m.first_name,' ',m.last_name) as MANAGER_NAME,d.department_name,j.job_title from employees e left outer join employees m on e.employee_id=m.employee_id join departments d on e.department_id=d.department_id join jobs j on j.job_id=e.job_id limit 3`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/Q59', async (req, res) => {
    try {
        const result = await pool.query(`select e.employee_id,concat(m.first_name,' ',m.last_name) as MANAGER_NAME,d.department_name,l.street_address,j.job_title from employees e left outer join employees m on e.employee_id=m.employee_id join departments d on e.department_id=d.department_id join jobs j on j.job_id=e.job_id join locations l on d.location_id=l.location_id limit 3`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/Q60', async (req, res) => {
    try {
        const result = await pool.query(`select country_name from countries where region_id =1`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/Q61',async(req,res)=>{
    try{
       const result = await pool.query("select d.department_name from departments d join locations l on d.location_id =l.location_id where l.city like 'N%'");
       res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/Q62',async(req,res)=>{
    try{
       const result = await pool.query("select e.* from employees e join departments d on e.department_id = d.department_id join employees m on d.manager_id = m.employee_id where m.commission_pct > .15 limit 3");
       res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/Q63',async(req,res)=>{
    try{
       const result = await pool.query("select j.job_title from employees e join jobs j on e.job_id=j.job_id where e.employee_id in (select manager_id from departments where manager_id is not null)");
       res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/Q64',async(req,res)=>{
    try{
       const result = await pool.query("select l.postal_code from locations l join countries c on l.country_id =c.country_id join regions r on c.region_id = r.region_id where r.region_name = 'Asia'");
       res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/Q65',async(req,res)=>{
    try{
       const result = await pool.query("select distinct d.department_name from employees e join departments d on e.department_id=d.department_id where e.commission_pct <(select avg(commission_pct) from employees)");
       res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/Q66',async(req,res)=>{
    try{
       const result = await pool.query("select department_id, count(*) as total_employees from employees group by department_id order by total_employees desc limit 3");
       res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/Q67',async(req,res)=>{
    try{
       const result = await pool.query("select job_id, avg(salary) as avg_salary from employees group by job_id order by avg_salary desc limit 3");
       res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/Q68',async(req,res)=>{
    try{
       const result = await pool.query("select e.first_name, d.department_name, l.city from employees e join departments d on e.department_id=d.department_id join locations l on d.location_id=l.location_id where l.state_province like 'C%' limit 4");
       res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/Q69',async(req,res)=>{
    try{
       const result = await pool.query("select d.department_name, count(e.employee_id) as employee_count from departments d left join employees e on d.department_id = e.department_id group by d.department_name order by employee_count desc limit 3");
       res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/Q70',async(req,res)=>{
    try{
       const result = await pool.query("select e.first_name, j.job_title, e.salary from employees e join jobs j on e.job_id = j.job_id where e.salary > (select avg(salary) from employees) limit 4");
       res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/Q71', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT d.department_name, AVG(e.commission_pct) AS avg_commission
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            GROUP BY d.department_id
            LIMIT 3
        `);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ Error: err.message }); }
});

app.get('/Q72', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT l.country_id, c.country_name, MAX(e.salary) AS max_salary
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id
            GROUP BY l.country_id, c.country_name
            LIMIT 3
        `);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ Error: err.message }); }
});

app.get('/Q73', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT j.job_title, d.department_name,
                   CONCAT(e.first_name, ' ', e.last_name) AS full_name,
                   e.hire_date AS start_date
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            JOIN departments d ON e.department_id = d.department_id
            WHERE e.hire_date BETWEEN '1993-01-01' AND '1997-08-31'
            LIMIT 3
        `);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ Error: err.message }); }
});

app.get('/Q74', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT c.country_name, l.city, COUNT(d.department_id) AS number_of_departments
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id
            GROUP BY c.country_name, l.city
            HAVING COUNT(e.employee_id) >= 2
            LIMIT 3
        `);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ Error: err.message }); }
});

app.get('/Q75', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.first_name || ' ' || e.last_name AS full_name,
                   j.job_title, jh.start_date, jh.end_date
            FROM job_history jh
            JOIN employees e ON jh.employee_id = e.employee_id
            JOIN jobs j ON jh.job_id = j.job_id
            WHERE e.commission_pct IS NULL OR e.commission_pct = 0
            LIMIT 3
        `);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ Error: err.message }); }
});

app.get('/Q76', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.first_name || ' ' || e.last_name AS full_name, c.country_name
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id
            LIMIT 3
        `);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ Error: err.message }); }
});

app.get('/Q77', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT * FROM employees
            WHERE salary IN (
                SELECT MIN(salary) FROM employees GROUP BY department_id
            )
            LIMIT 3
        `);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ Error: err.message }); }
});

app.get('/Q78', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT * FROM employees
            WHERE salary = (
                SELECT DISTINCT salary
                FROM employees
                ORDER BY salary DESC
                LIMIT 1 OFFSET 2
            )
            LIMIT 3
        `);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ Error: err.message }); }
});

app.get('/Q79', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT first_name || ' ' || last_name AS full_name, salary
            FROM employees
            WHERE salary > (SELECT AVG(salary) FROM employees)
              AND department_id IN (
                  SELECT department_id FROM employees
                  WHERE first_name ILIKE '%J%' OR last_name ILIKE '%J%'
              )
            LIMIT 3
        `);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ Error: err.message }); }
});

app.get('/Q80', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT first_name || ' ' || last_name AS full_name, e.employee_id, j.job_title
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN jobs j ON e.job_id = j.job_id
            WHERE l.city = 'Toronto'
            LIMIT 3
        `);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ Error: err.message }); }
});

app.get('/Q81', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT department_id, SUM(salary) AS total_salary
            FROM employees
            GROUP BY department_id
            HAVING COUNT(*) > 0
            LIMIT 3
        `);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ Error: err.message }); }
});

app.get('/Q82', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT employee_id, first_name, last_name, salary,
                   CASE
                       WHEN salary > (SELECT AVG(salary) FROM employees) THEN 'HIGH'
                       ELSE 'LOW'
                   END AS salary_status
            FROM employees
            LIMIT 3
        `);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ Error: err.message }); }
});

app.get('/Q83', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.*
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id
            WHERE c.country_name = 'United Kingdom'
            LIMIT 3
        `);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ Error: err.message }); }
});

app.get('/Q84', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.*
            FROM employees e
            JOIN (
                SELECT department_id, SUM(salary) AS dept_total_salary
                FROM employees
                GROUP BY department_id
            ) dept_salary ON e.department_id = dept_salary.department_id
            WHERE e.salary > 0.5 * dept_salary.dept_total_salary
            LIMIT 3
        `);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ Error: err.message }); }
});

app.get('/Q85', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT DISTINCT e.*
            FROM employees e
            JOIN employees m ON e.employee_id = m.manager_id
            LIMIT 3
        `);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ Error: err.message }); }
});

app.get('/Q86', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.employee_id, e.first_name, e.last_name, e.salary,
                   d.department_name, l.city
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            WHERE e.hire_date BETWEEN '2002-01-01' AND '2003-12-31'
              AND e.salary = (
                  SELECT MAX(salary)
                  FROM employees
                  WHERE hire_date BETWEEN '2002-01-01' AND '2003-12-31'
              )
            LIMIT 3
        `);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ Error: err.message }); }
});

app.get('/Q87', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.first_name, e.last_name, e.salary, e.department_id
            FROM employees e
            WHERE e.salary < (SELECT AVG(salary) FROM employees)
              AND e.department_id = (
                  SELECT department_id FROM employees WHERE first_name = 'Laura' LIMIT 1
              )
            LIMIT 3
        `);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ Error: err.message }); }
});

app.get('/Q88', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT d.*
            FROM departments d
            WHERE d.department_id IN (
                SELECT e.department_id
                FROM employees e
                WHERE e.salary >= 7000
                  AND e.employee_id IN (
                      SELECT employee_id FROM job_history
                  )
            )
            LIMIT 3
        `);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ Error: err.message }); }
});

app.get('/Q89', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT r.region_name, MIN(LENGTH(l.postal_code)) AS min_postal_length
            FROM regions r
            JOIN countries c ON r.region_id = c.region_id
            JOIN locations l ON c.country_id = l.country_id
            GROUP BY r.region_name
            LIMIT 3
        `);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ Error: err.message }); }
});

app.get('/Q90', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT * FROM employees ORDER BY hire_date DESC LIMIT 3
        `);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ Error: err.message }); }
});

app.get('/tables-count', async (req, res) => {
  try {
    const tables = ['regions', 'countries', 'employees', 'job_history', 'jobs','departments','locations'];
    const counts = {};

    for (let table of tables) {
      const result = await pool.query(`SELECT COUNT(*) FROM ${table}`);
      counts[table] = result.rows[0].count;
    }

    res.json(counts);
  } catch (error) {
    console.error('Error fetching counts:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});



const PORT = process.env.PORT || 6005;
app.listen(PORT,()=>{
    console.log(`Connected Successfully...on Port ${PORT}`)
});