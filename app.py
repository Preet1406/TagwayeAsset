from flask import Flask, request, render_template, redirect, url_for
from flask_bootstrap import Bootstrap
from flask_wtf import FlaskForm 
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import InputRequired, Email, Length
from flask_sqlalchemy  import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secretKey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
bootstrap = Bootstrap(app)
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(15), unique=True)
    email = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(80))

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
    
class LoginForm(FlaskForm):
    username = StringField('username', validators=[InputRequired(), Length(min=4, max=15)])
    password = PasswordField('password', validators=[InputRequired(), Length(min=8, max=80)])
    remember = BooleanField('remember me')

class RegisterForm(FlaskForm):
    email = StringField('email', validators=[InputRequired(), Email(message='Invalid email'), Length(max=50)])
    username = StringField('username', validators=[InputRequired(), Length(min=4, max=15)])
    password = PasswordField('password', validators=[InputRequired(), Length(min=8, max=80)])

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/login",  methods=['GET', 'POST'])
def login():
    form = LoginForm()

    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user:
            if check_password_hash(user.password, form.password.data):
                login_user(user, remember=form.remember.data)
                return redirect(url_for('dashboard'))

        return render_template('login.html', form=form, message = "Invalid username or password!")

    return render_template('login.html', form=form, message = "")

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    form = RegisterForm()
    Login_form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=Login_form.username.data).first()
        if user:
            return render_template('login.html', form = Login_form, message = "User Id exists please login!")
        hashed_password = generate_password_hash(form.password.data, method='sha256')
        new_user = User(username=form.username.data, email=form.email.data, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return render_template('login.html', form=Login_form, message = "New user has been created!")

    return render_template('signup.html', form=form)

@app.route("/dashboard")
@login_required
def dashboard():
    return render_template('dashboard.html', name=current_user.username)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/AHUEquipmentDetails')
@login_required
def AHUEquipmentDetails():
    return render_template('AHU_EquipmentDetails.html')

@app.route('/ChillerEquipmentDetails')
@login_required
def ChillerEquipmentDetails():
    return render_template('Chiller_EquipmentDetails.html')

@app.route('/space1')
@login_required
def space_1():
    return render_template('Space1.html')

@app.route('/space2')
@login_required
def space_2():
    return render_template('Space2.html')

@app.route('/space3')
@login_required
def space_3():
    return render_template('Space3.html')

@app.route('/space4')
@login_required
def space_4():
    return render_template('Space4.html')

@app.route('/buildingA')
@login_required
def buildingA():
    return render_template('buildingA.html')

@app.route('/ChillerForecastData')
@login_required
def ChillerForecastData():
    return render_template('ChillerForecastData.html')


@app.route('/AHUForecastData')
@login_required
def AHUForecastData():
    return render_template('AHUForecastData.html')

@app.route('/ChillerHistoricalData')
@login_required
def ChillerHistoricalData():
    return render_template('ChillerHistoricalData.html')

@app.route('/AHUHistoricalData')
@login_required
def AHUHistoricalData():
    return render_template('AHUHistoricalData.html')
