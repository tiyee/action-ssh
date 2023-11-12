# Action SSH

Simple GitHub Action to run a command on a remote server using SSH. This is working with the latest [GitHub Actions](https://github.com/features/actions).

## ✨ Example Usage

**Example using OpenSSH encrypted private key**

```yml
      - name: Action SSH
        id: action-ssh
        uses: tiyee/action-ssh@release
        with:
          host: ${{ secrets.HOST }} 
          port: ${{ secrets.PORT }} 
          username: ${{ secrets.USERNAME }} 
          privateKey: ${{ secrets.PRIVATE_KEY }} 
          command: 'ls -alh'
```

🔐 Set your secrets here: `https://github.com/USERNAME/REPO/settings/secrets`.

Check out [the workflow example](.github/workflows/ssh-example-workflow.yml) for a minimalistic yaml workflow in GitHub Actions.


## Options

- **host** - _string_ - Hostname or IP address of the server. 

- **port** - _integer_ - Port number of the server. **Default:** `22`

- **username** - _string_ - Username for authentication. 



- **privateKey** - _mixed_ - _Buffer_ or _string_ that contains a private key for either key-based or hostbased user authentication (OpenSSH format). 

- **command** - _string_ - Your shell command


## Development

---

This thing is built using Typescript and
[ssh2](https://github.com/mscdex/ssh2) . 🚀