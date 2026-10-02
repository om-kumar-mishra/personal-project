import matplotlib.pyplot as plt
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import numpy as nps
from scipy.cluster.hierarchy import dendrogram, linkage, fcluster
from sklearn.cluster import AgglomerativeClustering

from sklearn.cluster import DBSCAN


# Sample dataset (Income vs Spending Score)
data = {
    'Income': [15,16,16,17,18,19,19,20,21,22,30,31,32,33,34,35,36,37,38,39,70,72,73,75,76,77,78,80,85,90],
    'Spending_Score': [39,81,6,77,40,76,6,94,3,72,40,60,20,85,17,95,9,88,24,97,35,20,40,17,76,75,40,60,85,88]
}
df = pd.DataFrame(data)

wcss = []
for k in range(1, 11):
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(df)
    wcss.append(kmeans.inertia_)

# Plot
plt.plot(range(1, 11), wcss, marker='o')
plt.xlabel("Number of Clusters (K)")
plt.xticks(range(1, 11))
plt.grid()
plt.ylabel("WCSS")
plt.title("Elbow Method for Best K")
# plt.show()

kmeans = KMeans(n_clusters=3, random_state=42)
kmeans.fit(df)
labels = kmeans.labels_
# print(labels)
df['Cluster'] = labels

# Predict new customer cluster
new_customer = [[60, 40]]   # Income=60k, Spending Score=40
prediction = kmeans.predict(new_customer)
# print("New Customer belongs to Cluster:", prediction[0])
# model.predict()








############################################## Agglomerative Hierarchical Clustering

data = {
    'Income': [15,16,16,17,18,19,19,20,21,22,30,31,32,33,34,35,36,37,38,39,70,72,73,75,76,77,78,80,85,90],
    'Spending_Score': [39,81,6,77,40,76,6,94,3,72,40,60,20,85,17,95,9,88,24,97,35,20,40,17,76,75,40,60,85,88]
}
df = pd.DataFrame(data)
scaler = StandardScaler()
scaler.fit(df)
fit_scaler=scaler.transform(df)

Z = linkage(fit_scaler, method='single')

plt.figure(figsize=(10,5))
dendrogram(Z)
plt.title("Dendrogram - Agglomerative Clustering")
plt.xlabel("Customers")
plt.ylabel("Distance")
plt.show()


agg = AgglomerativeClustering(n_clusters=3, linkage='single')
df["Cluster"] = agg.fit_predict(fit_scaler)

# Cluster averages
cluster_mean = df.groupby("Cluster")[["Income","Spending_Score"]].mean()
# print(cluster_mean)



# ####################################################DBSCAN
db = DBSCAN(eps=0.8, min_samples=3)
df['Cluster'] = db.fit_predict(fit_scaler)
# plt.scatter(df['Income'], df['Spending_Score'], c=df['Cluster'],)
# plt.xlabel('Income')
# plt.ylabel('Spending Score')
# plt.title('DBSCAN Clustering')
# plt.show()

from scipy.spatial.distance import cdist
new_person = nps.array([[30, 40]])  # Income=40, Spending=50
new_person_scaled = scaler.transform(new_person)

distances = cdist(new_person_scaled, fit_scaler)  # pairwise distance
close_points = nps.sum(distances <= 0.8) 
print("close_points",close_points)
print(df)