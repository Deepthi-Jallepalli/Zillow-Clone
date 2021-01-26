# CMPE 202 Team Project Fall 2020

As part of the final team project we have designed and developed a web application called "HomeFinder" which is a replica of Zillow.
It provides a platform to buy, sell and rent different types of houses.
The design and implemenation includes both frontend and backend applications to support HomeFinder features states in team project requirements.

## Application URL
https://homefinder-frontend.herokuapp.com/

## Team Members

- Aditya Shah
- Deepthi Jallepalli
- Prashanth Narasimha
- Prerana Shekhar

## Technology Stack

* Lucid Charts - For Archeitecture design, DB design

* ReactJS, React Bootstrap, HTML, CSS - Frontend development

* DjangoRESTFul Framework, Python - For backend development

* PostgresSQL - Primary DB

* Algolia - Secondary DB to improve search performance

* Postman - REST API client to test the developed APIs

* Heroku - Deploy frontend and backend applications, PostgresSQL DB

* Project Management Tools 

  - GitHub - Source code and Project Management 

  - Google Sheet - Task tracking and sprint burndown 

  - Zoom - Team collaboration (Organizing daily scrum and other meetings)
  
  - Slack channel (CMPE-202-Zillow-Clone) - To discuss and share any information related to specific story or issues

## Architecture Diagram
<p align="center">
	<img width="650" src="https://user-images.githubusercontent.com/55044852/101270114-be8d0880-372a-11eb-8337-2d3a4c044321.png">
</p>

*	In order to design a web application such as a Home-finder which is search intensive, we decided to utilize CQRS architecture. Command query responsibility segregation (CQRS) applies the CQS principle by using separate Query and Command objects to retrieve and modify data, respectively. 
*	In our project, we have utilized the CQRS architecture in order to separate the reads and write requests hitting the same primary database. As the application has to render a huge amount of data (listings) on the landing page, it can drastically increase the load of querying the database. Hence, in order to overcome such an issue, we utilize Algolia search database to query all the listings.  This helps in increasing the efficiency of rendering all the listings on the web application. The primary database, Postgres, is always in sync with the Algolia Database. The Algolia database helps to render faceted search on the UI and also provides the auto complete, auto correction feature in the search bar on the web application. 
*	The application was deployed on Heroku, which is Platform as a Service. Heroku gives the ability to have a server and database running for a long time without any cost.  This enabled us to deploy the application within minutes and the ability to test it constantly on staging and production environments. 

## Database Design
<p align="center">
	<img width="1050" src="https://user-images.githubusercontent.com/55044852/101270215-d6b15780-372b-11eb-861e-0bc298e682de.png">
</p>

## UI Wireframes

https://github.com/gopinathsjsu/fa20-cmpe-202-sec-02-team-project-team_5/tree/master/docs/UI%20Wireframes

## Depolyment Diagram
<p align="center">
	<img width="650" src="https://user-images.githubusercontent.com/55044852/101270257-327be080-372c-11eb-80ef-a319790e3c44.png">
</p>

## Design Decisions
  * **Architecture-level:**
    * CQRS architecture : Choosing a search engine host “Algolia” to improve search performance for home listings by creating search indexes. It also provides dashboard analysis of hits and their performance.
    * Separate deployment environments for frontend and backend applications.


  * **Application Design-level**:
    * Leveraging Django’s Model and Views design patterns to design APIs. We have utilized the Structural Model and Normalized Model design pattern that allows us to define all the classes(database tables) in a single models.py file and follow the concept Object Relational Mapping. Class-based views pattern takes a request and returns a response. These allowed us to structure our APIs and reuse code by harnessing inheritance. These design patterns helped us in reducing the code maitainibity and eased designing new APIs in every upcoming sprint.
    * Separating configuration and highly quered tables. Associating configurations like User types, home listing types, user status, images as foriegn keys ids, helped in reducing query retrieval time. Tracking creation, updation and deletion time for each record and performing soft delete whenever required.
    * Storing images on AWS S3 cloud
    
  * **Business-level:**
    Below are listed are decisions or assumptions considered to maintain logically simplified features provided by HomeFinder application:
    <img width="1050" src="https://user-images.githubusercontent.com/56493886/101271807-0451cd00-373b-11eb-89fa-024b5ad4b1c1.PNG">
    * Users can search and browse through listings without any registration or even when the user registration is in pending status
    * Types of user status: Approved, Pending, Rejected, Deactivated
    * By default all registered user are assigned pending status
    * Users need to login to use all other services except searching and browsing.
    * Only approved users can login
    * A removed user can not register or login
    * Once a buyer application is approved, the property is marked as Sold
    * Email notifications are sent on approval or rejection of registration, receiving applications for posted listings, scheduling houses and visits
    * My Listings feature is only available for Realtor, Seller and Landlord
    * Buy tab lists only homes of sale type and Sell tab lists homes that can be rent-out
    * Mobile application support is out of scope
    * Seller or Realtor or Landlord can create and manage multiple listings

## Sprint Journal
<p align="center">
	<img width="1050" src="https://user-images.githubusercontent.com/56493886/101271089-b8038e80-3734-11eb-8e34-0ba9b1171ac2.PNG">
	<img width="1050" src="https://user-images.githubusercontent.com/55044852/101270299-8f779680-372c-11eb-939a-e56a9a2873de.png">
  	<img width="1050" src="https://user-images.githubusercontent.com/9063088/101273065-2b160080-3747-11eb-8758-3a0fbe8a80bc.png">
</p>

## XP Core Values

Throughout the project (sprints) we followed below stated XP core values:

- **Communication**
  * Communication was one of the key strengths of our team. We had weekly calls scheduled for every Monday evening to discuss the functionality, make necessary design decisions and assumptions.  
  * During the call we made sure to understand the progress, dependency on each other and any blockers.
  * We maintained Github projects Kanban Board to maintain the list of ToDo, InProgress, Completed tasks. This also helped us to understand the progress of various tasks throughout the sprint.
  * We had a clear work breakdown, which helped us clearly understand who was working on a specific feature and whom to contact when there was a need or dependency. This also completely eliminated doing any redundant work.
  * We also maintained a slack channel to communicate on a daily basis. Any clarifications regarding frontend and backend communication, rest api endpoints, request-response parameter details and much more was shared with each other on the channel regularly.

- **Feedback**

  * Feedback also played a very important role during the project development and testing phase. 
  * During the development phase we always pushed our changes to a branch and created pull requests. Once the code was approved by another team member, we pushed the changes to the master branch. We made sure the code changes on the master branch was always stable and did not break the other team member’s code.
  * During the testing phase, we gave feedback to each other by testing the features developed by team members. This helped in identifying the bugs.
  * The constant feedback helped to identify the unknowns and scenarios or features missed during the initial phase of the project. That helped us to make better assumptions and collective decisions.

- **Respect**
  * Throughout the project, all the team members were respectful of each other’s time, availability and the deliverables deadline.
  * The team was respectful of each other's suggestion in choosing the tools and technologies. Based on the individual's skills and comfort level, the team was accommodative to agree upon the framework utilized and programming languages. Nevertheless, all the team members were enthusiastic to learn and incorporate new software skills.
  * The suggestions about the CQRS architecture, usage of the Algolia database was well accepted and successfully implemented.

- **Simplicity**

  * At every step of our project we always evaluated the primary goals to be accomplished inorder to stay focused on what was required in the MVP.
  * We always had a segregation of “must haves” and “if possible”. 
  * We tried to reduce complexity while designing the database, api endpoints and the UI as well.
  * The backend code and database was deployed on Heroku to simply the tasks of other team members. We maintained multiple environments such as staging and production to separate development and production data. CI/CD was set up to ensure all the changes were available on Heroku server as soon as the changes were pushed to master. This enabled the frontend to be directly connected to the backend and database without replicating it in the local.
  * Similarly, the frontend code was always available on another Heroku app, which enabled all the team members to test each other’s code without replicating all the changes in the local. This reduced the efforts involved in constantly taking an update of the changes in local.

## Scrum Dashboard
Github Projects link:
https://github.com/gopinathsjsu/fa20-cmpe-202-sec-02-team-project-team_5/projects

<p align="center">
	<img width="1500" src="https://user-images.githubusercontent.com/56493886/101140019-3a6e4000-35c7-11eb-9a3c-f8e0326883dd.PNG">
</p>

## Individual Contribution

- Our team work division has two categories, Frontend and Backend application development

- Frontend Application design, implementation and deployments - Aditya Shah and Prashanth Narshima

- Backend Application design, implementation and deployments  - Deepthi Jallepalli and Prerana Shekar
<p align="center">
	<img width="650" src="https://user-images.githubusercontent.com/55044852/101270624-8e943400-372f-11eb-9ed9-5a42c5435779.png">
</p>

## Task Sheet 
https://github.com/gopinathsjsu/fa20-cmpe-202-sec-02-team-project-team_5/blob/master/docs/CMPE_202_Team_5_Sprint_Task_Sheet.xlsx
<p align="center">
	<img width="1500" src="https://user-images.githubusercontent.com/56493886/101270923-c9e43200-3732-11eb-8d1b-abf450d668bb.PNG">
</p>

## Wiki Links
Weekly scrum MOM details
https://github.com/gopinathsjsu/fa20-cmpe-202-sec-02-team-project-team_5/wiki

## Burndown Chart
<p align="center">
	<img width="1500" src="https://user-images.githubusercontent.com/56493886/101270922-c94b9b80-3732-11eb-80d4-b189207a5583.PNG">
</p>

## Presentation
Here is the link to our presentation
https://github.com/gopinathsjsu/fa20-cmpe-202-sec-02-team-project-team_5/blob/master/docs/Home%20Finder%20-%20Team%205.pptx

## Application Screenshots
Here is the link our Home-finder-Application screenshots
https://github.com/gopinathsjsu/fa20-cmpe-202-sec-02-team-project-team_5/tree/master/docs/Application%20Screenshots

## Heroku Screenshots
<p align="center">
	<img width="750" src="https://user-images.githubusercontent.com/55044852/101271093-bfc33300-3734-11eb-86fa-7ba022893be1.png">
	<img width="750" src="https://user-images.githubusercontent.com/55044852/101271098-c5207d80-3734-11eb-9265-508d98d0c4e5.png">
	<img width="750" src="https://user-images.githubusercontent.com/55044852/101271103-cc478b80-3734-11eb-807f-694450311910.png">
	<img width="750" src="https://user-images.githubusercontent.com/55044852/101271106-d4073000-3734-11eb-8003-1ef179d37e0a.png">
	<img width="750" src="https://user-images.githubusercontent.com/55044852/101271109-d9fd1100-3734-11eb-913a-5281a2a88f01.png">
  <img width="1319" src="https://user-images.githubusercontent.com/9063088/101273085-61538000-3747-11eb-8e5f-3c37e51c8c60.png">
  <img width="1236" src="https://user-images.githubusercontent.com/9063088/101273103-7f20e500-3747-11eb-93d2-b34084963ac7.png">
</p>

## Algoli Screenshots
<p align="center">
  <img width="650" src="https://user-images.githubusercontent.com/55044852/101270776-44ac4d80-3731-11eb-8df8-78c8cf049107.png">
  <img width="650" src="https://user-images.githubusercontent.com/55044852/101270779-47a73e00-3731-11eb-9d60-1d577ca02b54.png">
</p>

## AWS S3 Image Upload
<p align="center">
  <img width="650" src="https://user-images.githubusercontent.com/55044852/101270714-9d2f1b00-3730-11eb-8b0b-5016dcc2d518.png">
  <img width="650" src="https://user-images.githubusercontent.com/55044852/101270713-9bfdee00-3730-11eb-8bb2-709e725d0fac.png">
</p>

## Email Notofication Screenshots
*	On Registration Approval

<img width="650" src="https://user-images.githubusercontent.com/56493886/101271577-e1261e00-3738-11eb-81bd-094bb2d1641f.PNG">

*	On Registration Rejection

<img width="650" src="https://user-images.githubusercontent.com/56493886/101271579-e1beb480-3738-11eb-9e15-0e1c7cd301fc.PNG">

*	On Recieving new application 

<img width="650" src="https://user-images.githubusercontent.com/56493886/101271578-e1beb480-3738-11eb-8b2b-289c52dce1ec.PNG">

*	On Booking a open house schedule

<img width="650" src="https://user-images.githubusercontent.com/56493886/101271580-e1beb480-3738-11eb-8610-c2d9951af18f.PNG">

## Delivered APIs and Sample Postman requests and responses
- Core and Applications Postman screenshots

<p align="center">
	<img width="750" src="https://user-images.githubusercontent.com/56493886/101271670-eb94e780-3739-11eb-87c0-2bf069b559cc.png">
	<img width="750" src="https://user-images.githubusercontent.com/56493886/101271671-f0599b80-3739-11eb-9da5-cd36d1151fa8.PNG">
	<img width="750" src="https://user-images.githubusercontent.com/56493886/101271673-f780a980-3739-11eb-8622-5b0574525343.PNG">
	<img width="750" src="https://user-images.githubusercontent.com/56493886/101271680-023b3e80-373a-11eb-8527-ebc22bc0304f.PNG">
	<img width="750" src="https://user-images.githubusercontent.com/56493886/101271681-02d3d500-373a-11eb-966d-6ddc5a716d7b.PNG">
	<img width="750" src="https://user-images.githubusercontent.com/56493886/101271685-07988900-373a-11eb-939f-a7587fbd808a.PNG">
	<img width="750" src="https://user-images.githubusercontent.com/56493886/101271693-141ce180-373a-11eb-824a-b0659b076a05.PNG">
	<img width="750" src="https://user-images.githubusercontent.com/56493886/101271694-14b57800-373a-11eb-906d-bae6653096f8.PNG">
	<img width="750" src="https://user-images.githubusercontent.com/56493886/101271696-14b57800-373a-11eb-919a-e3c84f29c887.PNG">
	<img width="750" src="https://user-images.githubusercontent.com/56493886/101271698-154e0e80-373a-11eb-90cc-37f8b09fbc6c.PNG">
	<img width="750" src="https://user-images.githubusercontent.com/56493886/101271699-154e0e80-373a-11eb-8096-c94b92d6b77d.PNG">
</p>

- Listings Postman screenshots
<p align="center">
	<img width="750" src="https://user-images.githubusercontent.com/55044852/101271022-f9e00500-3733-11eb-8f41-8b4945afa870.png">
	<img width="750" src="https://user-images.githubusercontent.com/55044852/101271024-fb113200-3733-11eb-8526-b862211d9440.png">
	<img width="750" src="https://user-images.githubusercontent.com/55044852/101271027-fcdaf580-3733-11eb-8673-bfe5e60a55f2.png">
	<img width="750" src="https://user-images.githubusercontent.com/55044852/101271029-fe0c2280-3733-11eb-86f5-5925bf8af99b.png">
</p>

- Favorites Postman screenshots
<p align="center">
	<img width="750" src="https://user-images.githubusercontent.com/55044852/101272673-38c98700-3743-11eb-955a-6fb357f9f211.png">
	<img width="750" src="https://user-images.githubusercontent.com/55044852/101272676-3b2be100-3743-11eb-8079-ebbaa32ec683.png">
	<img width="750" src="https://user-images.githubusercontent.com/55044852/101272677-3b2be100-3743-11eb-82f6-aceafd0ed179.png">
	<img width="750" src="https://user-images.githubusercontent.com/55044852/101272678-3bc47780-3743-11eb-854f-c73d472eeff5.png">
	<img width="550" src="https://user-images.githubusercontent.com/55044852/101272679-3bc47780-3743-11eb-822b-9dda7e8581ee.png">
	<img width="550" src="https://user-images.githubusercontent.com/55044852/101272680-3c5d0e00-3743-11eb-967e-69d8e34190e6.png">
</p>	

