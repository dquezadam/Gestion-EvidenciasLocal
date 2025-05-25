## Levantamiento de la app en local

### Configurar el backend y base de datos 
 
```powershell
git clone https://github.com/dquezadam/Gestion-EvidenciasLocal
cd Gestion-Evidencias
python -m venv venv
source ./venv/Scripts/activate
cd backend
pip install -r requirements.txt
```

### Crear base de datos en postgres 

Como usuario postgres para una configuracion mas rapida, si quieren pueden hacer con un schema y usuario especifico y asignarlos en settings.py
```powershell
psql -U postgres
```
```sql
CREATE DATABASE gestion_db;
\q
```
Cambiar el password del usuario en /backend/backend/settings.py por tu password de postgres

### Migraciones,ejecucion del servidor y creacion de super usuario de django
```powershell
python manage.py makemigrations
pytgon manage.py makemigrations
python manage.py createsuperuser
python manage.py runserver
```


### Instalacion de dependencias de react y ejecutar el servicio
```powershell
cd ../frontend
npm install
npm start
```






