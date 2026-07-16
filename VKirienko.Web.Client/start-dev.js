'use strict';
const { spawn } = require('child_process');
const path = require('path');

const isWindows = process.platform === 'win32';
const baseDir = isWindows
  ? path.join(process.env.APPDATA, 'ASP.NET', 'https')	
  : path.join(process.env.HOME || process.env.USERPROFILE, '.aspnet', 'https');
const pkgName = process.env.npm_package_name || 'vkirienko-site';
const certFile = path.join(baseDir, `${pkgName}.pem`);
const keyFile  = path.join(baseDir, `${pkgName}.key`);

spawn(
  process.execPath,
  [
    require.resolve('@angular/cli/bin/ng'),
    'serve',
    '--ssl',
    `--ssl-cert=${certFile}`,
    `--ssl-key=${keyFile}`,
    '--host=127.0.0.1',
  ],
  { stdio: 'inherit', shell: false }
).on('exit', code => process.exit(code ?? 0));