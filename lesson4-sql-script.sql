drop table if exists products;
drop table if exists stocks;

create table products (
	id serial primary key,
	title text not null,
    descr text,
    price decimal
);

create table stocks (
	id uuid primary key default uuid_generate_v4(),
    count_items integer,
    product_id serial,
    constraint fk_products foreign key(product_id) 
    	references products (id)
);


insert into products (title, descr, price) values
('Causation', 'A Very Short Introduction', 1.20),
('Der entspannte Weg zum Reichtum', 'Book', 0.10),
('Das erfolgreiche Vorstellungsgespräch', 'Duden Ratgeber - Das erfolgreiche Vorstellungsgespräch: Von der Stellensuche zum erfolgreichen Vorstellungsgespräch', 200.2);

insert into stocks (count_items, product_id) values
(200, 1),
(1, 2),
(8, 3);


create extension if not exists "uuid-ossp";