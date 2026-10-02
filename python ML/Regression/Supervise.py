import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.svm import SVR
import matplotlib.pyplot as plt
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
import seaborn as sns


data = {
    'Experience': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    'Salary': [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5]
}

data = pd.DataFrame(data)

X = data[['Experience']]
y = data['Salary']


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
# print("X==", X)
# print("y", y)
# print("X_train.shap()", X_train.shape)
print( X_test)
# print("y_train.shap()", y_train.shape)
print(y_test)

scale=StandardScaler()
scale.fit(X_train)
x_train_scale=scale.transform(X_train)
x_test_scale=scale.transform(X_test)


model = LinearRegression()
model.fit(x_train_scale, y_train)

nu=scale.transform(np.array([[4]]))
y_pred = model.predict(x_test_scale)
print("Predicted Salary:", y_pred)


#Polynomial

poly = PolynomialFeatures()
X_poly = poly.fit_transform(X_train)

lin_poly = LinearRegression()
lin_poly.fit(X_poly, y_train)
exp = np.array([[4]])
exp_poly = poly.transform(exp)
# print("Polynomial Salary:", lin_poly.predict(exp_poly))



# DecisionTreeRegressor
des=DecisionTreeRegressor()
des.fit(X_train,y_train)
pridict=des.predict(np.array([[4]]))
print(np.array([[4]]))
# print("DecisionTreeRegressor Salary:", pridict)


# RandomForestRegressor
re=RandomForestRegressor()
re.fit(X_train,y_train)
# print("RandomForestRegressor Salary:", re.predict([[4]]))


# SVR
svr=SVR()
svr.fit(X_train,y_train)
# print("SVR Salary:", re.predict([[4]]))


# # Optional: Visualization
# plt.scatter(X, y, color='blue', label="Actual Data")
# plt.plot(X, model.predict(X), color='red', label="Regression Line")
# plt.scatter(4, y_pred, color='green', s=100, marker='x', label="Predicted Point")
# plt.xlabel("Experience (Years)")
# plt.ylabel("Salary (in LPA)")
# plt.legend()
# plt.show()

                              

                            #   Classfication

# Step 1: Load dataset
titanic = sns.load_dataset("titanic")
features = ["pclass", "sex", "age", "sibsp", "parch", "fare", "embark_town", "survived"]
df = titanic[features]

# Step 2: Handle missing values
df["age"].fillna(df["age"].median(), inplace=True)
df["embark_town"].fillna(df["embark_town"].mode()[0], inplace=True)

# Step 3: Split X and y
X = df.drop("survived", axis=1)
y = df["survived"]

# Step 4: Encode categorical columns
X["sex"] = X["sex"].map({"male": 1, "female": 0})
X["embark_town"] = X["embark_town"].map({"Southampton": 0, "Cherbourg": 1, "Queenstown": 2})
# print(X)
# Step 5: Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=47
)  

# LogisticRegression
print(df)
lg=LogisticRegression()      
model=lg.fit(X_train,y_train)  
new_passenger_array = np.array([[1, 0, 38.0, 1, 0, 71.2833, 1]])
predict=model.predict(new_passenger_array)  
print(predict)      