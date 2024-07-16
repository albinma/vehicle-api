IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'vPICList_Lite1')
BEGIN
  CREATE DATABASE [vPICList_Lite1]

  RESTORE DATABASE [vPICList_Lite1]
  FROM  DISK = N'/var/opt/mssql/backups/vPICList_lite.bak'
  WITH  FILE = 1,
  MOVE N'vPICList_Lite1' TO N'/var/opt/mssql/data/vPICList_Lite1.mdf',
  MOVE N'vPICList_Lite1_log' TO N'/var/opt/mssql/data/vPICList_Lite1_log.ldf',
  NOUNLOAD,  REPLACE,  STATS = 5
END
GO
