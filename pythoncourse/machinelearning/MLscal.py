# yah method waha use hita hai jaha alg alg mesurement unit hota hai

# example

'''from sklearn.preprocessing import StandardScaler
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn import linear_model
from sklearn.metrics import mean_squared_error, r2_score


# Example data
data = {
    "Experience": [1, 3, 5, 7, 9, 11, 13, 15],
    "Education_Level": [2, 3, 3, 4, 4, 5, 5, 6],
    "Age": [22, 25, 28, 32, 36, 40, 45, 50],
    "Salary": [30, 50, 70, 85, 100, 130, 150, 180]  # Dependent variable
}

df = pd.DataFrame(data)
x = df[["Experience", "Education_Level", "Age"]]  
# y = df["Salary"]

scaler = StandardScaler()
scaled_data = scaler.fit_transform(x)

print("Standardized Data:\n", )'''



from sklearn.preprocessing import StandardScaler
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn import linear_model
from sklearn.metrics import mean_squared_error, r2_score


# Example data
data = {
    "Experience": [1, 3, 5, 7, 9, 11, 13, 15],
    "Education_Level": [2, 3, 3, 4, 4, 5, 5, 6],
    "Age": [22, 25, 28, 32, 36, 40, 45, 50],
    "Salary": [30, 50, 70, 85, 100, 130, 150, 180]  # Dependent variable
}

df = pd.DataFrame(data)
x = df[["Experience", "Education_Level", "Age"]]  
y = df["Salary"]

scaler = StandardScaler()
scaled_data = scaler.fit_transform(x)
regre=linear_model.LinearRegression()
regre.fit(scaled_data,y)
scaled=scaler.transform([[1,2,22]])
y_pred = regre.predict([scaled[0]])
print(y_pred)


print("Standardized Data:\n", )



