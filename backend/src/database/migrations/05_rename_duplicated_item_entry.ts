import Knex from 'knex';

export async function up(knex: Knex) {
    return knex('items')
        .where('title', 'Lâmpadas')
        .andWhere('image', 'organicos.svg')
        .update({
            'title': 'Resíduos Orgânicos'
        });
}

export async function down(knex: Knex) {
    return knex('items')
        .where('title', 'Resíduos Orgânicos')
        .andWhere('image', 'organicos.svg')
        .update({
            'title': 'Lâmpadas'
        });
}