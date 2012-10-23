﻿using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class UserHandler
    {
        private ConcurrentDictionary<string, User> _userList;
        private GameHandler _gameHandler;

        public UserHandler(GameHandler gameHandler)
        {
            _userList = new ConcurrentDictionary<string, User>();
            _gameHandler = gameHandler;
        }

        public bool UserExistsAndReady(string connectionId)
        {
            return _userList.ContainsKey(connectionId) && _userList[connectionId].MyShip != null;
        }

        public void RemoveUser(string connectionId)
        {
            User u;
            _userList.TryRemove(connectionId, out u);
            if (!u.Controller && u.MyShip != null)
            {
                u.MyShip.Dispose();
                u.MyShip.Host = null; // Remove linking from the ship
            }
        }

        public void AddUser(User user)
        {
            _userList.TryAdd(user.ConnectionID, user);
            user.IdleManager.OnIdle += _gameHandler.RemoveShipFromGame;
            user.IdleManager.OnComeBack += _gameHandler.AddShipToGame;
            if (!user.Controller)
            {
                user.MyShip.OnFire += _gameHandler.AddBulletToGame;
            }
        }

        public User GetUser(string connectionId)
        {
            return _userList[connectionId];
        }

        public Ship GetUserShip(string connectionId)
        {
            return _userList[connectionId].MyShip;
        }

        public User FindUserByIdentity(string identity)
        {
            return (from user in _userList.Values
                    where user.RegistrationTicket.Identity == identity && !user.Controller
                    select user).FirstOrDefault();
        }

        public ICollection<User> GetUsers()
        {
            return _userList.Values;
        }

        public ICollection<string> GetUserConnectionIds()
        {
            return _userList.Keys;
        }
    }
}