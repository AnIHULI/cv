-- Таблица employees

-- Создать таблицу employees
-- - id. serial,  primary key,
-- - employee_name. Varchar(50), not null
-- Наполнить таблицу employee 70 строками.

create table employees(
	id serial primary key,
	employee_name varchar(50) not null
);


insert into employees(employee_name)
values  ('Olivia'),
		('Amelia'),
		('Isla'),
		('Lily'),
		('Ava'),
		...
		('Emma'),
		('Eleanor');

--------------------------------------------

--Таблица salary

-- Создать таблицу salary
-- - id. Serial  primary key,
-- - monthly_salary. Int, not null
-- Наполнить таблицу salary 16 строками:
-- - 1000
-- - 1100
-- - 1200
-- - 1300
-- - 1400
-- - 1500
-- - 1600
-- - 1700
-- - 1800
-- - 1900
-- - 2000
-- - 2100
-- - 2200
-- - 2300
-- - 2400
-- - 2500


create table salary(
	id serial primary key,
	monthly_salary int not null
);

insert into salary(monthly_salary)
values  (1000),
		(1100),
		...
		(2400),
		(2500);

--------------------------------------------

-- Таблица employee_salary

-- Создать таблицу employee_salary
-- - id. Serial  primary key,
-- - employee_id. Int, not null, unique
-- - salary_id. Int, not null
-- Наполнить таблицу employee_salary 40 строками:
-- - в 10 строк из 40 вставить несуществующие employee_id

create table employee_salary (
	id serial primary key,
	employee_id int not null unique,
	salary_id int not null
);

insert into employee_salary(employee_id, salary_id)
values  (3,7),
		(1,4),
		(5,9),
		(40,13),
		(23,4),
		...
		(71,8),
		(75,10),
		(77,9);
		
--------------------------------------------

-- Таблица roles

-- Создать таблицу roles
-- - id. Serial  primary key,
-- - role_name. int, not null, unique
-- Поменять тип столба role_name с int на varchar(30)
-- Наполнить таблицу roles 20 строками:

create  table roles(
	id serial primary key,
	role_name int not null unique
);

alter table roles alter column role_name type varchar(30)

insert into roles(role_name)
values  ('Junior Python developer'),
		('Middle Python developer'),
		('Senior Python developer'),
		('Junior Java developer'),
		('Middle Java developer'),
		('Senior Java developer'),
		('Junior JavaScript developer'),
		('Middle JavaScript developer'),
		('Senior JavaScript developer'),
		('Junior Manual QA engineer'),
		('Middle Manual QA engineer'),
		('Senior Manual QA engineer'),
		('Project Manager'),
		('Designer'),
		('HR'),
		('CEO'),
		('Sales manager'),
		('Junior Automation QA engineer'),
		('Middle Automation QA engineer'),
		('Senior Automation QA engineer');

--------------------------------------------

-- Таблица roles_employee

-- Создать таблицу roles_employee
-- - id. Serial  primary key,
-- - employee_id. Int, not null, unique (внешний ключ для таблицы employees, поле id)
-- - role_id. Int, not null (внешний ключ для таблицы roles, поле id)
-- Наполнить таблицу roles_employee 40 строками:


create table roles_employee(
	id serial primary key,
	employee_id int not null unique,
	foreign key (employee_id) references employees(id),
	role_id int not null,
	foreign key (role_id) references roles(id)
);

select * from roles_employee;

insert into roles_employee(employee_id, role_id)
values  (7,2),
		(20,4),
		(3,9),
		...
		(41,5),
		(35,9);
		
--------------------------------------------


create table City(
	id serial,
	title varchar(50)
)

create table Person(
	id serial,
	person_name varchar(50),
	city_id int
)

insert into City(title)
values  ('Berlin'),
		('Tokio'),
		('Antalya'),
		('Paris'),
		('Roma')

select * from City;

insert into Person(person_name, city_id)
values  ('Victor',1),
		('Elena',2),
		('Anna',1),
		('Vadim',3),
		('Ivan',7),
		('Ira',9)
		
		

-- Вывести города из таблицы City, где проживают люди из таблицы Person
select person_name, person.city_id, city.title, city.id from
person inner join city
on person.city_id = city.id;

-- Вывести города из таблицы City, где проживают люди из таблицы Person + вывод остатка из левой таблицы
select person_name, person.city_id, city.title, city.id from
person left join city
on person.city_id = city.id;

-- Вывести города из таблицы City, где проживают люди из таблицы Person + вывод остатка из правой таблицы
select person_name, person.city_id, city.title, city.id from
person right join city
on person.city_id = city.id;

-- Вывести города из таблицы City, где проживают люди из таблицы Person + вывод остатка из левой и правой таблиц
select person_name, person.city_id, city.title, city.id from
person full outer join city
on person.city_id = city.id;

-- Вывести все города из таблицы City и всех людей из таблицы Person. Все со всеми
select person_name, person.city_id, city.title, city.id from
person cross join city;
