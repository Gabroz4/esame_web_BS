INSERT INTO `camere` (`nomecamera`, `postiletto`, `prezzonotte`) VALUES
('Camera Superior', 4, 95.00),
('Camera Duplex', 2, 75.00),
('Camera Vintage', 3, 115.00),
('Camera Art Deco', 2, 105.00),
('Camera Standard', 1, 40.00);

INSERT INTO `utente` (`nome`, `cognome`, `email`, `password`) VALUES 
('Mario', 'Rossi', 'mario.rossi@mario.com', SHA2('Ciao mamma', 512)),
('Luca', 'Bianchi', 'luca.bianchi@luca.com', SHA2('Password123', 512)),
('Anna', 'Verdi', 'anna.verdi@anna.com', SHA2('SecurePwd', 512)),
('Giovanni', 'Neri', 'giovanni.neri@giovanni.com', SHA2('StrongPass', 512)),
('Sara', 'Gialli', 'sara.gialli@sara.com', SHA2('Secret123', 512)),
('Alessandro', 'Blu', 'alessandro.blu@alessandro.com', SHA2('MyPassword', 512)),
('Laura', 'Marrone', 'laura.marrone@laura.com', SHA2('P@ssw0rd', 512)),
('Roberto', 'Viola', 'roberto.viola@roberto.com', SHA2('Password567', 512)),
('Elena', 'Rosa', 'elena.rosa@elena.com', SHA2('MySecurePwd', 512)),
('Davide', 'Arancio', 'davide.arancio@davide.com', SHA2('Secure123', 512)),
('Simona', 'Azzurro', 'simona.azzurro@simona.com', SHA2('StrongPassword', 512)),
('Admin', 'Admin', 'admin@admin.com', SHA2('Admin', 512));

INSERT INTO `chaletalpi`.`prenotazione` (`datainizio`, `datafine`, `prezzo`, `email`, `nomecamera`) VALUES 
('2023-01-01', '2023-01-05', 475.00, 'mario.rossi@mario.com', 'Camera Superior'),
('2023-02-10', '2023-02-15', 375.00, 'luca.bianchi@luca.com', 'Camera Duplex'),
('2023-03-20', '2023-03-25', 575.00, 'anna.verdi@anna.com', 'Camera Vintage'),
('2023-04-05', '2023-04-10', 315.00, 'giovanni.neri@giovanni.com', 'Camera Art Deco'),
('2023-05-15', '2023-05-20', 160.00, 'sara.gialli@sara.com', 'Camera Standard'),
('2023-06-25', '2023-06-30', 575.00, 'alessandro.blu@alessandro.com', 'Camera Vintage'),
('2023-07-10', '2023-07-15', 420.00, 'laura.marrone@laura.com', 'Camera Art Deco'),
('2023-08-20', '2023-08-25', 525.00, 'roberto.viola@roberto.com', 'Camera Superior'),
('2023-09-05', '2023-09-10', 490.00, 'elena.rosa@elena.com', 'Camera Duplex'),
('2023-10-15', '2023-10-20', 450.00, 'davide.arancio@davide.com', 'Camera Standard');



--ALTER TABLE `categoria`
  --MODIFY `idcategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

