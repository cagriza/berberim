import { createDatabase } from "../server/db.js";

const db = await createDatabase();
const roleCount = db.prepare("select count(*) as count from roles").get().count;
const serviceCount = db.prepare("select count(*) as count from services").get().count;
const stockCount = db.prepare("select count(*) as count from stock_items").get().count;
const staffCount = db.prepare("select count(*) as count from staff_profiles").get().count;

db.close();

console.log(`SQLite hazır: ${roleCount} rol, ${serviceCount} hizmet, ${stockCount} stok kaydı, ${staffCount} personel.`);
