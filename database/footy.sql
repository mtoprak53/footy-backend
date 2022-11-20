\echo 'Delete and recreate footy db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE footy;
CREATE DATABASE footy;
\connect footy

\i database/footy-schema.sql
\i database/footy-seed-timezones.sql
\i database/footy-seed-users.sql
\i database/footy-seed-countries.sql
\i database/footy-seed-leagues.sql

\echo 'Delete and recreate footy_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE footy_test;
CREATE DATABASE footy_test;
\connect footy_test

\i database/footy-schema.sql
\i database/footy-seed-timezones.sql
\i database/footy-seed-users.sql
\i database/footy-seed-countries.sql
\i database/footy-seed-leagues.sql