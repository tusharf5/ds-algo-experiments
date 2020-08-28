const roles = {
  manager: ['a', 'b', 'c'],
  owner: ['a', 'b', 'c', 'd', 'e', 'f'],
  marketing: ['a', 'e'],
  developer: ['b', 'c', 'd'],
  user: ['a', 'b'],
};

const cache = {};

function assignRole(acl) {}

class Permission {
  name;
  role;
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}

class RoleSet {
  constructor() {
    this.root = null;
  }

  sorted = new WeakMap();

  addRoles(role) {
    Object.keys(role).forEach((roleName) => {
      this.addPermission(role[roleName], roleName);
    });
  }

  sortPermissions(permissions) {
    permissions.sort(function (a, b) {
      const textA = a.toLowerCase();
      const textB = b.toLowerCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  }

  addPermission(permissions, role) {
    if (!this.sorted[permissions]) {
      this.sortPermissions(permissions);
      this.sorted[permissions] = true;
    }
    // if no permission added yet add one to root
    if (!this.root) {
      this.root = {};
      this.addNewRootPermissionTree(permissions, role);
    } else {
      // check if a permission tree at root already exist
      if (!this.root[permissions[0]]) {
        this.addNewRootPermissionTree(permissions, role);
      } else {
        // add to an existing root tree
        this.addToExistingPermissionTree(permissions, role);
      }
    }
  }

  addNewRootPermissionTree(permissions, role) {
    let curr = this.root;
    for (let i = 0; i < permissions.length; i++) {
      const permNode = new Permission(permissions[i]);
      curr[permNode.name] = permNode;
      curr = permNode;
    }
    curr.role = role;
  }

  addToExistingPermissionTree(permissions, role) {
    let curr = this.root;
    for (let i = 0; i < permissions.length; i++) {
      if (curr[permissions[i]]) {
        curr = curr[permissions[i]];
        continue;
      }
      const permNode = new Permission(permissions[i]);
      curr[permNode.name] = permNode;
      curr = permNode;
    }
    curr.role = role;
  }

  findRoleAndPerms(permissions) {
    if (!this.sorted[permissions]) {
      this.sortPermissions(permissions);
      this.sorted[permissions] = true;
    }
    const noRole = { role: undefined, permissions: [] };
    let role;
    let curr = this.root[permissions[0]];
    if(!curr) {
      return noRole;
    }
    let indexForPerm = 0;
    for (let i = 0; i < permissions.length; i++) {
      if (curr.role) {
        indexForPerm = i;
        role = curr.role;
      }
      if (curr[permissions[i + 1]]) {
        curr = curr[permissions[i + 1]];
      } else {
        break;
      }
    }
    if (indexForPerm) {
      return { role: role, permissions: permissions.slice(indexForPerm + 1) };
    } else {
      return noRole;
    }
  }
}

let roleTrie = new RoleSet();
roleTrie.addRoles(roles);
console.log(roleTrie.findRoleAndPerms(['a', 'b']));
console.log(roleTrie.findRoleAndPerms(['a', 'e']));
console.log(roleTrie.findRoleAndPerms(['b', 'c', 'd']));
console.log(roleTrie.findRoleAndPerms(['a', 'b', 'd', 'c', 'e']));
console.log(roleTrie.findRoleAndPerms(['a', 'b', 'c', 'd', 'e', 'f']));
console.log(roleTrie.findRoleAndPerms(['d', 'c', 'a', 'e', 'b']));
