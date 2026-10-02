import pandas as pd
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, association_rules
from mlxtend.frequent_patterns import fpgrowth

data = {
    'Transaction': [1, 2, 3, 4, 5, 6],
    'Item1': ['Milk', 'Bread', 'Milk', 'Eggs', 'Milk', None],
    'Item2': ['Bread', 'Butter', None, 'Bread', None, 'Milk'],
    'Item3': ['Eggs', None, 'Butter', None, 'Bread', 'Butter']
}

#################################################### Drop Column Transaction
df=pd.DataFrame(data)
df=df.drop('Transaction',axis=1)

##################################################### remove none value from dataset
clean=[]
print(df.shape[1])
for col in df.columns:
    column_items = []
    for x in df[col]:
        if x is not None:  
            column_items.append(x)
    clean.append(column_items)  

print("Column-wise cleaned data:")
#######################################convert into single list 
singelList=[]
for i in clean:
   for j in i:
       singelList.append(j)

##################################################################################Count how may product repeted
import collections
p=collections.Counter(singelList)  
df=pd.DataFrame({"items":p.keys(),"value":p.values() })     
print(df)

########################################################################################convert into matrix
te = TransactionEncoder()
te.fit(clean)
encoderData=te.transform(clean)
df=pd.DataFrame(encoderData,columns=te.columns_)

##############################################################################apriori

frequent_itemsets = apriori(df, min_support=0.2, use_colnames=True, max_len=3)


# print(frequent_itemsets)



# ######################################################################fpgrowth
fp=fpgrowth(df, min_support=0.2, use_colnames=True, max_len=3)

print(fp)

