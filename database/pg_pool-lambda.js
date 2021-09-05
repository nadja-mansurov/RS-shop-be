'use strict';
const { Pool } = require('pg')

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env
const dbOptions = {
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    ssl: {
        rejectUnauthorized: false // to avoid warring in this example
    },
    connectionTimeoutMillis: 5000 // time in millisecond for termination of the database query
}

// cached variable
let pool

module.exports.invoke = async event => {
    // Check if pool already exists. Create new one if not.
    if( !pool ) {
        pool = new Pool(dbOptions);
    }

    // Get client from pool
    const client = await pool.connect();

    try {
        //make ddl query for creation table
        const ddlResult = await client.query(`
            create table if not exists products (
                id serial primary key,
                title text not null,
                descr text,
                price decimal
            );`);
        const ddlResult2 = await client.query(`
            create table if not exists stocks (
                id uuid primary key default uuid_generate_v4(),
                count_items integer,
                product_id serial,
                constraint fk_products foreign key(product_id) 
                    references products (id)
            )`);
        // console.log(ddlResult. ddlResult2);


        // make initial dml queries
        const dmlResult = await client.query(`
            insert into products (title, descr, price) values
                ('Causation', 'A Very Short Introduction', 1.20),
                ('Der entspannte Weg zum Reichtum', 'Book', 0.10),
                ('Das erfolgreiche Vorstellungsgespräch', 'Duden Ratgeber - Das erfolgreiche Vorstellungsgespräch: Von der Stellensuche zum erfolgreichen Vorstellungsgespräch', 200.2);
                `);
        const dmlResult2 = await client.query(`
            insert into stocks (count_items, product_id) values
            (200, 1),
            (1, 2),
            (8, 3);`
        );

        // make select query
        const { rows: stocks } = await client.query(`select * from stocks`);
        console.log(stocks);

    } catch (err) {
        // you can process error here. In this example just log it to console.
        console.error('Error during database request executing:', err);
    } finally {
        client.release(); // release connection for other executions
    }

};