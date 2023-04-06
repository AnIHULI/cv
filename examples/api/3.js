//login
POST
Auth
Basic auth

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

resp_data = pm.response.json();
console.log("Response: ", resp_data)
pm.environment.set("token", resp_data.token);

///////////////////////////////////////////////////////////////////////////////////////////////////////
//user_info
POST
BODY:
RAW

{
    "age" : 26,
    "salary" : 1000,
    "name": "Suleyman",
    "auth_token" : "{{token}}"
}

// 1) Статус код 200
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

var req_data = JSON.parse(pm.request.body.raw)
var resp_data = pm.response.json();
console.log(req_data)

// 2) Проверка структуры json в ответе.
schema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "person": {
      "type": "object",
      "properties": {
        "u_age": {
          "type": "integer"
        },
        "u_name": {
          "type": "array",
          "items": [
            {
              "type": "string"
            },
            {
              "type": "integer"
            },
            {
              "type": "integer"
            }
          ]
        },
        "u_salary_1_5_year": {
          "type": "integer"
        }
      },
      "required": [
        "u_age",
        "u_name",
        "u_salary_1_5_year"
      ]
    },
    "qa_salary_after_12_months": {
      "type": "number"
    },
    "qa_salary_after_6_months": {
      "type": "integer"
    },
    "start_qa_salary": {
      "type": "integer"
    }
  },
  "required": [
    "person",
    "qa_salary_after_12_months",
    "qa_salary_after_6_months",
    "start_qa_salary"
  ]
}


pm.test ("Validating schema", function (){
    pm.response.to.have.jsonSchema(schema);
});

// 3) В ответе указаны коэффициенты умножения salary, напишите тесты по проверке правильности результата перемножения на коэффициент.
pm.test("qa_salary_after_6_months", function () {
    pm.expect(req_data.salary*2).to.eql(resp_data.qa_salary_after_6_months);
});

pm.test("qa_salary_after_12_months", function () {
    pm.expect(req_data.salary*2.9).to.eql(resp_data.qa_salary_after_12_months);
});

pm.test("u_salary_1.5_year", function () {
    pm.expect(req_data.salary*4).to.eql(resp_data.person.u_salary_1_5_year);
});

// 4) Достать значение из поля 'u_salary_1.5_year' и передать в поле salary запроса http://162.55.220.72:5005/get_test_user
pm.environment.set("u_salary_1_5_year", resp_data.person.u_salary_1_5_year);


///////////////////////////////////////////////////////////////////////////////////////////////////////
//new_data
POST
BODY:
form-data

age: "26"
salary: "1000"
name: "Suleyman"
auth_token: "{{token}}"

var req_data = request.data;
var resp_data = pm.response.json();

// 1) Статус код 200
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});


// 2) Проверка структуры json в ответе.
schema = {
  "type": "object",
  "properties": {
    "age": {
      "type": "integer"
    },
    "name": {
      "type": "string"
    },
    "salary": {
      "type": "array",
      "items": [
        {
          "type": "integer"
        },
        {
          "type": "string"
        },
        {
          "type": "string"
        }
      ]
    }
  },
  "required": [
    "age",
    "name",
    "salary"
  ]
}

pm.test ("Validating schema", function (){
    pm.response.to.have.jsonSchema(schema);
});


// 3) В ответе указаны коэффициенты умножения salary, напишите тесты по проверке правильности результата перемножения на коэффициент.
pm.test("salary*2 eql with salary[1]", function () {
    pm.expect(+req_data.salary*2).to.eql(+resp_data.salary[1]);
});

pm.test("salary*3 eql with salary[2]", function () {
    pm.expect(+req_data.salary*3).to.eql(+resp_data.salary[2]);
});

// 4) проверить, что 2-й элемент массива salary больше 1-го и 0-го
pm.test("salary[2] above salary[1] and [0]", function () {
    pm.expect(+resp_data.salary[2]).to.above(+resp_data.salary[1]) && pm.expect(+resp_data.salary[2]).to.above(+resp_data.salary[0]);
});


///////////////////////////////////////////////////////////////////////////////////////////////////////
//test_pet_info
POST
BODY:
form-data

age: "26"
weight: "5"
name: "Suleyman"
auth_token: "{{token}}"

var req_data = request.data;
var rest_data = pm.response.json();

console.log(req_data)

// 1) Статус код 200
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// 2) Проверка структуры json в ответе.
const schema = {
    "type": "object",
    "properties" : {
        "age": {
            "type" : "integer"
        },
        "daily_food" : {
            "type" : "number"
        },
        "daily_sleep" : {
            "type" : "number"
        },
        "name" : {
            "type" : "string"
        }
    },
    "required": [
        "age",
        "daily_food",
        "daily_sleep",
        "name",
    ]
}



pm.test ("Validating schema", function (){
    pm.response.to.have.jsonSchema(schema);
});

// 3) В ответе указаны коэффициенты умножения weight, напишите тесты по проверке правильности результата перемножения на коэффициент.
pm.test("daily_food = weight*0.012", function () {
    pm.expect(+req_data.weight*0.012).to.eql(rest_data.daily_food);
});

pm.test("daily_sleep = weight*2.5", function () {
    pm.expect(+req_data.weight*2.5).to.eql(rest_data.daily_sleep);
});


///////////////////////////////////////////////////////////////////////////////////////////////////////
//get_test_user
POST
BODY:
x-www-form-urlunencoded

age: "26"
salary: "1000"
name: "Suleyman"
auth_token: "{{token}}"

req_data = request.data;
resp_data = pm.response.json();


// 1) Статус код 200
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// 2) Проверка структуры json в ответе.
schema = {
  "type": "object",
  "properties": {
    "age": {
      "type": "string"
    },
    "family": {
      "type": "object",
      "properties": {
        "children": {
          "type": "array",
          "items": [
            {
              "type": "array",
              "items": [
                {
                  "type": "string"
                },
                {
                  "type": "integer"
                }
              ]
            },
            {
              "type": "array",
              "items": [
                {
                  "type": "string"
                },
                {
                  "type": "integer"
                }
              ]
            }
          ]
        },
        "u_salary_1_5_year": {
          "type": "integer"
        }
      },
      "required": [
        "children",
        "u_salary_1_5_year"
      ]
    },
    "name": {
      "type": "string"
    },
    "salary": {
      "type": "integer"
    }
  },
  "required": [
    "age",
    "family",
    "name",
    "salary"
  ]
}


pm.test ("Validating schema", function (){
    pm.response.to.have.jsonSchema(schema);
});

// 3) Проверить что занчение поля name = значению переменной name из окружения
pm.environment.set("name", req_data.name);
pm.test("Name in response is eql name in env", function () {
    pm.expect(resp_data.name).to.eql(pm.environment.get("name"));
});

// 4) Проверить что занчение поля age в ответе соответсвует отправленному в запросе значению поля age
pm.test("Age in req eql with age in resp", function () {
    pm.expect(req_data.age).to.eql(resp_data.age);
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
//currency
POST
BODY:
x-www-form-urlunencoded

auth_token: {{token}}
resp_data = pm.response.json();

// 1) Можете взять любой объект из присланного списка, используйте js random.
object = resp_data[_.random(resp_data.length)]

// В объекте возьмите Cur_ID и передать через окружение в следующий запрос.
pm.environment.set("Cur_ID", object.Cur_ID);

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

//var listVal = [];

for (let i = 0; i<resp_data.length; i++) {
// for (let i = 0; i<10; i++) {
    //listVal.push(resp_data[i].Cur_Abbreviation);
    pm.sendRequest({
  url: 'http://54.157.99.22:80/curr_byn',
  method: 'POST',
  header: {
    'Content-Type': 'application/json',
  },
  body: {
    mode: 'urlencoded',
    urlencoded: [{ key: 'auth_token', value: pm.environment.get('token')},
    { key: 'curr_code', value: [i]}]
  }
}, (error, response) => {
        // resp_data2 = response.json();
        if (response.code == 500){
            // pass();
            console.log("500 error occurred")
        }
        else if(response.code == 200){
            if (Object.hasOwn(response.json(), 'Cur_Abbreviation')){
    //             const result = {
    //     "Cur_Abbreviation": resp_data2.Cur_Abbreviation,
    //     "Cur_ID": resp_data2.Cur_ID,
    //     "Cur_Name": resp_data2.Cur_Name,
    //     "Cur_OfficialRate": resp_data2.Cur_OfficialRate,
    //     "Cur_Scale": resp_data2.Cur_Scale,
    //     "Date": resp_data2.Date
    // }
                // console.log(result);
                console.log(response.json());
            }
            else{
                console.log("There is no Cur_Abbreviation key in json")
            }
        }
    });
}

//console.log("List of Cur_Abbreviation " + listVal)