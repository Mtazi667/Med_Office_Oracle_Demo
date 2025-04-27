import oracledb from 'oracledb';
import dotenv from 'dotenv';
dotenv.config();

// Si tu utilises l’Instant Client Windows
if (process.env.ORACLE_CLIENT_LIB_DIR) {
    oracledb.initOracleClient({ libDir: process.env.ORACLE_CLIENT_LIB_DIR });
}

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

export async function getConnection() {
    return oracledb.getConnection({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        connectString: process.env.DB_CONNECT_STRING
    });
}
