/**
 * Migration para atualizar os valores de todos pontos criados com o default `image-fake.svg`
 */
import Knex from 'knex';

export async function up(knex: Knex) {
    return knex('points')
        .update({
            'image': 'https://images.unsplash.com/photo-1560891788-75137d27109c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=250&q=50'
        });

}

export async function down(knex: Knex) {
    return knex('points')
        .update({
            'image': 'image-fake.svg'
        });
}