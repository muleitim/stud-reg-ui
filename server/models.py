from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    
    registration_number = db.Column(db.String(100), unique=True, nullable=False)
    
    firstname = db.Column(db.String(100), nullable=False)
    middlename = db.Column(db.String(100))  
    lastname = db.Column(db.String(100), nullable=False)

    date_of_birth = db.Column(db.String(20), nullable=False)  # stored as string in 'YYYY-MM-DD'
    
    gender = db.Column(db.String(10), nullable=False)
    nationality = db.Column(db.String(50), nullable=False)
    
    previous_school = db.Column(db.String(150), nullable=False)
    admission_number = db.Column(db.String(100), nullable=False)
    
    photo_filename = db.Column(db.String(255), nullable=False)  # uploaded photo file name
