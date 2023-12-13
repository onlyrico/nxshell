/*
 * 我们采用IPC 模型
 */

const { spawn } = require('child_process');


class SSH {
    constructor(name) {
      this.ssh_remote = null;
      this.name = name;
      this.native_path  = "/usr/bin/ssh"
      if (process.platform === 'win32') {
        // TODO: use bin in the package
      }
    }
  
    link (bw, ip, port, username, password, authtype) {
      console.log(`Startup SSh with IP ${ip}:${port}!`);
      /* Fork a native ssh process */
      this.ssh_remote = spawn('ssh', [`${username}@${ip}`, '-p', `${port}`]);
      this.ssh_remote.stdout.on('data', (data) => {
        bw.webContents.send('ssh-contents', data)
      });
      this.ssh_remote.stderr.on('data', (data) => {
        bw.webContents.send('ssh-contents', data)
      });
    }

    unlink() {

    }

    stdin() {
      ssh.stdin.write('ls\n');
      ssh.stdin.end();
    }

    stdout() {

    }

  }
  
  // 导出类的一个实例
  module.exports = SSH;