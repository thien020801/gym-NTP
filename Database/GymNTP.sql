Create Database GymNTP
Go 
Use GymNTP
Go
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY identity not null,
    CusName VARCHAR(255),
	Email VARCHAR(255),
	PhoneNumber VARCHAR(20),
    Password VARCHAR(255),
    Image VARCHAR(255),
    Status INT,
    Point INT
);


CREATE TABLE Employee (
    EmployeeID INT PRIMARY KEY identity not null,
    EmName VARCHAR(255),
    Address VARCHAR(255),
    Email VARCHAR(255),
	PhoneNumber VARCHAR(20),
    Password VARCHAR(255),
    DateOfBirth DATE,
    Gender VARCHAR(10),
);

CREATE TABLE Trainers (
    TrainerID INT PRIMARY KEY identity not null,
    TrainerName VARCHAR(255),
    PhoneNumber VARCHAR(20),
    Password VARCHAR(255),
    Address VARCHAR(255),
    Email VARCHAR(255),
    DateOfBirth DATE,
    Gender VARCHAR(10),
    Image VARCHAR(255),
    Cost DECIMAL(10,2),
    Salary DECIMAL(10,2)
);

CREATE TABLE MonthlySubscriptions (
    MonthlySubscriptionID INT PRIMARY KEY identity not null,
    Name VARCHAR(255),
    Cost DECIMAL(10,2),
    Duration INT
);

CREATE TABLE SessionSubscriptions (
    SessionSubscriptionID INT PRIMARY KEY identity not null,
    Name VARCHAR(255),
    Cost DECIMAL(10,2),
    NumberOfSessions INT
);

CREATE TABLE Bills (
    BillID INT PRIMARY KEY identity not null,
    CustomerID INT,
    EmployeeID INT,
    TrainerID INT,
    MonthlySubscriptionID INT,
    SessionSubscriptionID INT,
    TotalBill DECIMAL(10,2),
    StartDate DATE,
    EndDate DATE,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (TrainerID) REFERENCES Trainers(TrainerID),
    FOREIGN KEY (MonthlySubscriptionID) REFERENCES MonthlySubscriptions(MonthlySubscriptionID),
    FOREIGN KEY (SessionSubscriptionID) REFERENCES SessionSubscriptions(SessionSubscriptionID)
);

CREATE TABLE Attendance (
    AttendanceID INT PRIMARY KEY identity not null,
    BillID INT,
    CheckInTime DATETIME,
    FOREIGN KEY (BillID) REFERENCES Bills(BillID)
);



