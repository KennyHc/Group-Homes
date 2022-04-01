INSERT INTO Candidates (ID, income, family_type, foster_experience, contact)
VALUES (87324,45000,'single','none','albert54@gmail.com');

INSERT INTO Candidates (ID, income, family_type, foster_experience, contact)
VALUES (78231,55000,'divorced','one','erenYeager@gmail.com');

INSERT INTO Candidates (ID, income, family_type, foster_experience, contact)
VALUES (90324,75000,'single','many','1maria@gmail.com');

INSERT INTO Candidates (ID, income, family_type, foster_experience, contact)
VALUES (37461,80000,'common_law','none','tom90@gmail.com');

INSERT INTO Candidates (ID, income, family_type, foster_experience, contact)
VALUES (34324,78000,'single','many','sammy78@gmail.com');

INSERT INTO Candidates (ID, income, family_type, foster_experience, contact)
VALUES (87461,70000,'common_law','many','raymondGod@ubc.alumni.ca');

INSERT INTO Child_info_and_relations (child_ID, name, ethnicity, birthday, gender, group_home_address, resident_start_date)
VALUES (74361,'Juan','Asian','2006-09-01','Man','6200 University Blvd, Vancouver','2018-09-01');

INSERT INTO Child_info_and_relations (child_ID, name, ethnicity, birthday, gender, group_home_address, resident_start_date)
VALUES (30123,'Alice','White','2005-12-01','Woman','2366 Main Mall, Vancouver','2014-09-01');



SELECT G.name FROM Group_Homes G
WHERE NOT EXISTS(
        (SELECT * FROM Child_info_and_relations C2
         WHERE C2.ethnicity='Asian' and
                 C2.child_ID NOT IN(
                 SELECT C.child_ID FROM Child_info_and_relations C
                 WHERE C.ethnicity ='Asian' and
                         C.group_home_address = G.address
             )))
  and EXISTS(SELECT * FROM Child_info_and_relations C3
             WHERE C3.ethnicity='Asian');


CREATE TABLE `Candidates`(
                             `ID` INT NOT NULL UNIQUE PRIMARY KEY,
                             `income` INT,
                             `family_type` VARCHAR(55),
                             `foster_experience` VARCHAR(55),
                             `contact` VARCHAR(55) NOT NULL
);