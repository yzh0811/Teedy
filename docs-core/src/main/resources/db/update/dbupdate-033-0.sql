create cached table T_REGISTRATION_REQUEST (REQ_ID_C varchar(36) not null, REQ_USERNAME_C varchar(50) not null, REQ_PASSWORD_C varchar(100) not null, REQ_EMAIL_C varchar(100) not null, REQ_STATUS_C varchar(20) not null, REQ_CREATEDATE_D datetime not null, REQ_UPDATEDATE_D datetime, REQ_ADMIN_ID_C varchar(36), primary key (REQ_ID_C));
alter table T_REGISTRATION_REQUEST add constraint FK_REQ_ADMIN_ID_C foreign key (REQ_ADMIN_ID_C) references T_USER (USE_ID_C) on delete restrict on update restrict;

update T_CONFIG set CFG_VALUE_C = '33' where CFG_ID_C = 'DB_VERSION'; 