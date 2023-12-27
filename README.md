## Skaffold
Skaffold is being used to automatically deploy into the local dev k8s cluster any changes made on the code. To start it, run the following command while positioned on the folder where the skaffold.yaml file is.
```bash
skaffold dev
```
The process will keep running and listening for changes, when you want to stop working on this project, just press Ctrl-C to kill the Skaffold process and it will delete all the deployments, services and other k8s objects that it manages.

## Secrets in k8s
```bash
kubectl create secret generic tickets-jwt-secret --from-literal=JWT_KEY=1234
```
Check the secret created with:
```bash
kubectl get secrets
```

## Use of domain tickets.dev locally
Add the following line to the file /etc/hosts:
```shell
127.0.0.1 tickets.dev
```

