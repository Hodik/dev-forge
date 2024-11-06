import sqlite3


def create_connection():
    conn = sqlite3.connect("licenses.db")
    return conn


def create_tables(conn: sqlite3.Connection):
    cursor = conn.cursor()

    cursor.execute(
        """CREATE TABLE IF NOT EXISTS license (
            license_key TEXT NOT NULL UNIQUE PRIMARY KEY,
            discord_user_id TEXT NOT NULL,
            created_at DATETIME NOT NULL
        )"""
    )
    conn.commit()
