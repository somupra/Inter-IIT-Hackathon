# SRLMS

*Smart Road Leasing and Maintenance System*
 is a portal that can potentially help to cut cost of government spent in supervising road constructions and road maintentance by crowd sourcing this information. To make this portal effective we have implemented features of upvoting/downvoting,marking spam, freezing accounts and incentives so that false information stay low on the portal. There are separate modules for users and officials.


## Features

### Login and Registration
Users can register and login themselves in app after which they are redirected to the dashboard.

### Dashboard
The dashboard serves as a feed where the posts from different users are shown from nearby locations. Location of the user is constantly recorded by GPS. The users can :
1. Upvote and downvote other posts.
2. Upload new posts.
3. Track status of their complaints/posts. 

### Upvotes/Downvotes
The main issue that the authorities may face in using this app is the relaibility of crowd sourced data. Users can file fake complaints and give wrong details. To tackle with this problem we give the feature of upvoting and downvoting other posts so that correct posts can be easily identified.

### Uploading new post
Whenever a user chooses to upload new post, he/she is supposed to provide a photograph clicked of the site along with description. The location of user will be obtained via GPS and then a new post gets created. User also has to select if the post is about roads under construction or about maintenance of road. This will help authorities to separate the posts easily.

### Track status of the post
Every post is monitored by the relevant authority which can identify the problems aur the progress of contructions from the post. If the post is a complaint, then the admin can also mark it resolved once it is removed.

### Admin Site
The admin site is the interface provided for admin. It can only be accessed by officials. The admin dashboard contains all the posts relevant to them.

### Spams
One of the major problem can be of spamming the portal with wrong posts. To tackle this we have added addition power to officials to marks spam or wrong reports. The account of any user who crosses the threshold of spams limit will be freezed for 10 days. In the meantime the user won't be able to create new posts but can upvote and downvote other possts. If the user makes valuable contribution by upvoting and downvoting other posts, the account can be unfreezed before 10 days.

### Departments
To ensure that complaints are processed faster, we have setup departments on the admin side. The admin can assign tasks to officials that is for different road construction and maintenance. Alongwith tasks, the admin marks the locations of roads on map. Now whenever a new task is created, it's closest marker is then identified and the official associated with the task then can see the post.

### Incentives
To promote the correct use of app, we have designed a structure to give inctentives to authors for valuable inputs they give. For every report that is resolved (is obviously verified to be true) , the author is given some points. These points can then later be redeemed at places like paying toll taxes.



## Notes:

*For development(not containerized yet) database name "srlmsdb", username "dbadmin" with password "srlmsdb"*
