from openai import OpenAI
import mysql.connector

# =============================
# OpenAI Client
# =============================

client = OpenAI(api_key="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")

# =============================
# MySQL Connection
# =============================

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="test"
)

cursor = conn.cursor()

# =============================
# Database Schema
# =============================

schema = """
Tables:

REAssets(REAssetId, AssetName, ZoneId)

ZoneDetails(ZoneId, ZoneName)

RESales(RESalesId, REAssetId, REUnitDetailId, BookingDate)

REUnitSales(RESalesID, PriceHeader, Amount, Collections)

REPriceHeaders(REAssetID, HeaderValue, ValueType)

REUnitDetails(REAssetId, UniqueKey, AreaConsidered, AreaConsideredMeasurement)
"""

# =============================
# User Question
# =============================

question = input("Ask your question: ")

# =============================
# Generate SQL
# =============================

prompt = f"""
Convert the following question into a MySQL query.

Database schema:
{schema}

Question:
{question}

Return only SQL query.
"""

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": prompt}]
)

sql_query = response.choices[0].message.content.strip()

# =============================
# Execute SQL
# =============================

cursor.execute(sql_query)
result = cursor.fetchall()

# =============================
# Convert Result to Answer
# =============================

prompt2 = f"""
User question: {question}

Database result: {result}

Give final answer in simple sentence.
Do not show SQL.
"""

response2 = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": prompt2}]
)

answer = response2.choices[0].message.content

print("\nAnswer:")
print(answer)