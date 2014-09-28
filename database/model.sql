  
drop table if exists users;
create table users (
    id    serial primary key,
    number varchar(40),
    who  ENUM('driver', 'passenger')
);

drop table if exists routes;
create table routes (
    id          serial primary key,
    postcode    varchar(5),
    uid         integer references users(id),
    schedule    bigint,
    nextsend    bigint
);

drop table if exists events;
create table events (
    id          varchar(50) primary key not null,
    headline    varchar(100),
    crowdscore  integer,
    postcode    varchar(5),
    starttime   bigint,
    stoptime    bigint
);
