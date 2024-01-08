INSERT INTO `camere` (`nomecamera`, `postiletto`, `prezzonotte`, `descrizione`, `imgcamera1`, `imgcamera2`) VALUES
('Superior', 4, 95.00, 'Camera spaziosa e lussuosa con comfort moderni, perfetta per famiglie o gruppi.', '001.jpg', '003.jpg'),
('Duplex', 2, 75.00, 'Camera accogliente in stile duplex per un soggiorno confortevole per coppie.', '002.jpg', '004.jpg'),
('Vintage', 3, 115.00, 'Camera elegantemente decorata con un tocco vintage, ideale per un esperienza classica e di stile.', '005.jpg', '006.jpg');

INSERT INTO `utente` (`nome`, `cognome`, `email`, `password`) VALUES 
('Mario', 'Rossi', 'mario.rossi@mario.com', SHA2('Ciao mamma', 512)),
('Luca', 'Bianchi', 'luca.bianchi@luca.com', SHA2('Password123', 512)),
('Anna', 'Verdi', 'anna.verdi@anna.com', SHA2('SecurePwd', 512)),
('admin', 'admin', 'admin@admin.com', SHA2('admin', 512)),
('Giovanni', 'Neri', 'giovanni.neri@giovanni.com', SHA2('StrongPass', 512));

INSERT INTO `chaletalpi`.`prenotazione` (`id`, `datainizio`, `datafine`, `prezzo`, `email`, `nomecamera`) VALUES 
(1, '2023-01-01', '2023-01-05', 475.00, 'mario.rossi@mario.com', 'Superior'),
(2, '2023-02-10', '2023-02-15', 375.00, 'luca.bianchi@luca.com', 'Duplex'),
(3, '2023-03-20', '2023-03-25', 575.00, 'anna.verdi@anna.com', 'Vintage');

