#!/usr/bin/env python
# coding: utf-8

# In[1]:


import sys
import pymysql

class Database:
    """Database connection class."""

    def __init__(self, config):
        self.host = config.db_host
        self.username = config.db_user
        self.password = config.db_password
        self.port = config.db_port
        self.dbname = config.db_name
        self.conn = None

    def open_connection(self):
        """Connect to MySQL Database."""
        try:
            if self.conn is None:
                self.conn = pymysql.connect(
                    self.host,
                    user=self.username,
                    passwd=self.password,
                    db=self.dbname,
                    charset='utf8',
                    cursorclass=pymysql.cursors.DictCursor)
        except pymysql.MySQLError as e:
            print(e)
            sys.exit()
        finally:
            print('Connection opened successfully.')

    def run_query(self, query):
        """Execute SQL query."""
        try:
            self.open_connection()
            with self.conn.cursor() as cur:
                if 'SELECT' in query:
                    cur.execute(query)
                    result = cur.fetchall()
                    cur.close()
                    return result
                result = cur.execute(query)
                self.conn.commit()
                affected = f"{cur.rowcount} rows affected."
                cur.close()
                return affected
        except pymysql.MySQLError as e:
            print(e)
            sys.exit()
        finally:
            if self.conn:
                self.conn.close()
                self.conn = None
                print('Database connection closed.')


# In[9]:


