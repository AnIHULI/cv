//first
GET

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("Body matches string", function () {
    pm.expect(pm.response.text()).to.include("This is the first responce from server!ss");
});

///////////////////////////////////////////////////////////////////////////////////////////////////////

//user_info_3
POST
Body:
form-data
name: Suleyman
age: 26
salary: 1000

// 2. Статус код 200
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// 3. Спарсить response body в json.
var resp_data = pm.response.json();
console.log(resp_data)


// 4. Проверить, что name в ответе равно name s request (name вбить руками.)
pm.test("Name in request same with name in response", function () {
    pm.expect(resp_data.name).to.eql('Suleyman');
});


// 5. Проверить, что age в ответе равно age s request (age вбить руками.)
pm.test("Age in request same with age in response", function () {
    pm.expect(resp_data.age).to.eql('26');
});

// 6. Проверить, что salary в ответе равно salary s request (salary вбить руками.)
pm.test("Salary in request same with salary in response", function () {
    pm.expect(resp_data.salary).to.eql(1000);
});

// 7. Спарсить request.
var req_data = request.data;

// 8. Проверить, что name в ответе равно name s request (name забрать из request.)
pm.test("Name in request same with name in response (via variable)", function () {
    pm.expect(req_data.name).to.eql(resp_data.name);
});

// 9. Проверить, что age в ответе равно age s request (age забрать из request.)
pm.test("Age in request same with age in response (via variable)", function () {
    pm.expect(req_data.age).to.eql(resp_data.age);
});

// 10. Проверить, что salary в ответе равно salary s request (salary забрать из request.)
pm.test("Salary in request same with salary in response (via variable)", function (){
    pm.expect(+req_data.salary).to.eql(resp_data.salary);
});

// 11. Вывести в консоль параметр family из response.
console.log("Family = ", resp_data.family);

// 12. Проверить что u_salary_1_5_year в ответе равно salary*4 (salary забрать из request)
// console.log(resp_data.family.u_salary_1_5_year)
pm.test("u_salary_1_5_year in request eql with salary*4 in response (via variable)", function () {
    pm.expect((+req_data.salary)*4).to.eql(resp_data.family.u_salary_1_5_year);
});

///////////////////////////////////////////////////////////////////////////////////////////////////////

//object_info_3?name=anvirus&age=26&salary=1000
GET
Params:
name: Suleyman
age: 26
salary: 1000

// 1. Отправить запрос.
pm.sendRequest(pm.variables.get('url')+"/object_info_3?name=anvirus&age=26&salary=1000", function (err, response) {
    console.log(response.json());
});

// 2. Статус код 200
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// 3. Спарсить response body в json.
var resp_data = pm.response.json();

// 4. Спарсить request.
var req_data = pm.request.url.query.all();

// 5. Проверить, что name в ответе равно name s request (name забрать из request.)
pm.test("Name in request same with name in response (via variable)", function () {
    pm.expect(req_data[0].value).to.eql(resp_data.name);
});

// 6. Проверить, что age в ответе равно age s request (age забрать из request.)
pm.test("Age in request same with age in response (via variable)", function () {
    pm.expect(req_data[1].value).to.eql(resp_data.age);
});

// 7. Проверить, что salary в ответе равно salary s request (salary забрать из request.)
pm.test("Salary in request same with salary in response (via variable)", function () {
    pm.expect(+req_data[2].value).to.eql(resp_data.salary);
});

// 8. Вывести в консоль параметр family из response.
console.log(resp_data.family)

// 9. Проверить, что у параметра dog есть параметры name.
pm.test("Param 'dog' has 'name' param", function () {
    pm.expect(resp_data.family.pets.dog).to.have.property("name");
});

// 10. Проверить, что у параметра dog есть параметры age.
pm.test("Param 'dog' has 'age' param", function () {
    pm.expect(resp_data.family.pets.dog).to.have.property("age");
});

// 11. Проверить, что параметр name имеет значение Luky.
pm.test("Dog name is Luky", function () {
    pm.expect(resp_data.family.pets.dog.name).to.eql("Luky");
});

// 12. Проверить, что параметр age имеет значение 4.
pm.test("Dog age is 4", function () {
    pm.expect(resp_data.family.pets.dog.age).to.eql(4);
});

///////////////////////////////////////////////////////////////////////////////////////////////////////

//object_info_4?name=anvirus&age=26&salary=1000
GET
Params:
name: Suleyman
age: 26
salary: 1000

// 2. Статус код 200
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// 3. Спарсить response body в json.
resp_data = pm.response.json();

// 4. Спарсить request.
req_data = pm.request.url.query.toObject();

// 5. Проверить, что name в ответе равно name s request (name забрать из request.)
pm.test("Your test name", function () {
    pm.expect(req_data.name).to.eql(resp_data.name);
});

// 6. Проверить, что age в ответе равно age из request (age забрать из request.)
pm.test("Your test name", function () {
    pm.expect(+req_data.age).to.eql(resp_data.age);
});

// 7. Вывести в консоль параметр salary из request.
console.log("Request salary = ", +req_data.salary)

// 8. Вывести в консоль параметр salary из response.
console.log("Response salary = ", resp_data.salary)


// 9. Вывести в консоль 0-й элемент параметра salary из response.
console.log("Response salary [0] = ", resp_data.salary[0])


// 10. Вывести в консоль 1-й элемент параметра salary параметр salary из response.
console.log("Response salary [1] = ", resp_data.salary[1])


// 11. Вывести в консоль 2-й элемент параметра salary параметр salary из response.

console.log("Response salary [2] = ", resp_data.salary[2])

// 12. Проверить, что 0-й элемент параметра salary равен salary из request (salary забрать из request.)
pm.test("0 element req_salary eql resp_salary", function () {
    pm.expect(+req_data.salary).to.eql(resp_data.salary[0]);
});

// 13. Проверить, что 1-й элемент параметра salary равен salary*2 из request (salary забрать из request.)
pm.test("1 element req_salary*2 eql resp_salary", function () {
    pm.expect((+req_data.salary)*2).to.eql(+resp_data.salary[1]);
});

// 14. Проверить, что 2-й элемент параметра salary равен salary*3 из request (salary забрать из request.)
pm.test("2 element req_salary*3 eql resp_salary", function () {
    pm.expect((+req_data.salary)*3).to.eql(+resp_data.salary[2]);
});

// 15. Создать в окружении переменную name
pm.environment.set("name");

// 16. Создать в окружении переменную age
pm.environment.set("age");

// 17. Создать в окружении переменную salary
pm.environment.set("salary");

// 18. Передать в окружение переменную name
pm.environment.set("name", resp_data.name);

// 19. Передать в окружение переменную age
pm.environment.set("age", resp_data.age);

// 20. Передать в окружение переменную salary
pm.environment.set("salary", resp_data.salary);

// 21. Написать цикл который выведет в консоль по порядку элементы списка из параметра salary.
for (i of resp_data.salary) {
    console.log(i)
};

///////////////////////////////////////////////////////////////////////////////////////////////////////

//user_info_2
POST
Body:
form-data
name: Suleyman
age: 26
salary: 1000

// 1. Вставить параметр salary из окружения в request
salary_local = pm.environment.get("salary");

// 2. Вставить параметр age из окружения в age
age_local = pm.environment.get("age");

// 3. Вставить параметр name из окружения в name
name_local = pm.environment.get("name");

// 4. Отправить запрос.
pm.test("Request sent", function () {
    pm.response.to.be.ok;
});

// 5. Статус код 200
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// 6. Спарсить response body в json.
resp_data = pm.response.json();

// 7. Спарсить request.
req_data = request.data;

// 8. Проверить, что json response имеет параметр start_qa_salary
pm.test("start_qa_salary", function () {
    pm.expect(resp_data).to.have.property('start_qa_salary');
});

// 9. Проверить, что json response имеет параметр qa_salary_after_6_months
pm.test("qa_salary_after_6_months", function () {
    pm.expect(resp_data).to.have.property('qa_salary_after_6_months');
});

// 10. Проверить, что json response имеет параметр qa_salary_after_12_months
pm.test("qa_salary_after_12_months", function () {
    pm.expect(resp_data).to.have.property('qa_salary_after_12_months');
});

// 11. Проверить, что json response имеет параметр qa_salary_after_1.5_year
pm.test("qa_salary_after_1.5_year", function () {
    pm.expect(resp_data).to.have.property('qa_salary_after_1.5_year');
});

// 12. Проверить, что json response имеет параметр qa_salary_after_3.5_years
pm.test("qa_salary_after_3.5_years", function () {
    pm.expect(resp_data).to.have.property('qa_salary_after_3.5_years');
});

// 13. Проверить, что json response имеет параметр person
pm.test("person", function () {
    pm.expect(resp_data).to.have.property('person');
});

// 14. Проверить, что параметр start_qa_salary равен salary из request (salary забрать из request.)
pm.test("Param start_qa_salary is eql salary from request", function () {
    pm.expect(+req_data.salary).to.eql(resp_data.start_qa_salary);
});

// 15. Проверить, что параметр qa_salary_after_6_months равен salary*2 из request (salary забрать из request.)
pm.test("Param qa_salary_after_6_months is eql salary*2 from request", function () {
    pm.expect(+req_data.salary*2).to.eql(resp_data.qa_salary_after_6_months);
});

// 16. Проверить, что параметр qa_salary_after_12_months равен salary*2.7 из request (salary забрать из request.)
pm.test("Param qa_salary_after_12_months is eql salary*2.7 from request", function () {
    pm.expect(+req_data.salary*2.7).to.eql(resp_data.qa_salary_after_12_months);
});

// 17. Проверить, что параметр qa_salary_after_1.5_year равен salary*3.3 из request (salary забрать из request.)
pm.test("Param qa_salary_after_1.5_year is eql salary*3.3 from request", function () {
    pm.expect(+req_data.salary*3.3).to.eql(resp_data["qa_salary_after_1.5_year"]);
});

// 18. Проверить, что параметр qa_salary_after_3.5_years равен salary*3.8 из request (salary забрать из request.)
pm.test("Param qa_salary_after_3.5_years is eql salary*3.8 from request", function () {
    pm.expect(+req_data.salary*3.8).to.eql(resp_data["qa_salary_after_3.5_years"]);
});

// 19. Проверить, что в параметре person, 1-й элемент из u_name равен salary из request (salary забрать из request.)
pm.test("В параметре person, 1-й элемент из u_name равен salary из request", function () {
    pm.expect(+req_data.salary).to.eql(resp_data.person.u_name[1]);
    // pm.expect(+req_data).to.eql('salary');
});

// 20. Проверить, что параметр u_age равен age из request (age забрать из request.)
pm.test("Параметр u_age равен age из request", function () {
    pm.expect(+req_data.age).to.eql(resp_data.person.u_age);
});

// 21. Проверить, что параметр u_salary_5_years равен salary*4.2 из request (salary забрать из request.)
pm.test("Параметр u_salary_5_years равен salary*4.2 из request", function () {
    pm.expect(+req_data.salary*4.2).to.eql(resp_data.person.u_salary_5_years);
});

// 22. ***Написать цикл который выведет в консоль по порядку элементы списка из параметра person.
for (i in resp_data.person) {
    console.log(i)
};
console.log(resp_data.person.u_name)