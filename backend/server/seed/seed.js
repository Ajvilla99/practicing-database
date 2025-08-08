import { seed_books } from "./seed_books.js";
import { seed_loans } from "./seed_loans.js";
import { seed_users } from "./seed_users.js";

(async () => {
    try {
        console.log('🚀 Iniciando seeders...');

        await seed_users();
        await seed_books();
        await seed_loans();

        console.log('✅ Todos los seeders ejecutados correctamente.');
    } catch (error) {
        console.error('❌ Error ejecutando los seeders:', error.message);
    } finally {
        process.exit();
    }
})()