<?php
echo password_verify("Sandanithin@2026", '$2y$10$pT6D42u9M4B9cE1u4xMhI.f54rLg3Q98iR6aDqVd3p2J6EwY9Xl9e') ? "MATCH" : "NO_MATCH";
echo "\n";
echo password_hash("Sandanithin@2026", PASSWORD_BCRYPT);
