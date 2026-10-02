from sqlalchemy import create_engine, text
import openai
from prompt_template import build_prompt

DATABASE_URL = "mysql+pymysql://root:password@localhost:3306/testdb"

engine = create_engine(DATABASE_URL)

def execute_query(sql):
    with engine.connect() as conn:
        result = conn.execute(text(sql))
        return [dict(row._mapping) for row in result]


# step 2


def build_prompt(question, schema):
    return f"""
You are an expert MySQL query generator.

Database Schema:
{schema}

Rules:
- Only generate SELECT queries
- Use MySQL syntax
- Do not use DELETE, UPDATE, INSERT, DROP
- Return only SQL query
- No explanation

User Question:
{question}

SQL:
"""



openai.api_key = "YOUR_OPENAI_KEY"

def generate_sql(question, schema):
    prompt = build_prompt(question, schema)

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0
    )

    return response.choices[0].message.content.strip()