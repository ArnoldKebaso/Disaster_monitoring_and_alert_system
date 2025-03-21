Flood Monitoring and Alert System (FMAS)
========================================

_Disaster Recovery, Flood Alert & Response System_

The Flood Monitoring and Alert System (FMAS) is a comprehensive digital platform designed to mitigate the impact of floods in Kenya. The system is targeted at vulnerable communities—particularly the Budalangi community—and is aimed at enhancing flood preparedness, reporting, and response. FMAS leverages real-time data collection, predictive analytics, geospatial mapping, and multi-channel communication (SMS and email) to provide timely alerts, facilitate incident reporting, and disseminate educational resources for flood preparedness and recovery.

Table of Contents
-----------------

*   [Overview](#overview)
    
*   [Features](#features)
    
*   [Architecture and Design](#architecture-and-design)
    
*   [Requirements](#requirements)
    
*   [Implementation Plan](#implementation-plan)
    
*   [Installation and Setup](#installation-and-setup)
    
*   [Usage](#usage)
    
*   [Testing](#testing)
    
*   [Contributing](#contributing)
    
*   [License](#license)
    
*   [Acknowledgements](#acknowledgements)
    

Overview
--------

FMAS is developed as a final year project (COMP 493) at Egerton University, Faculty of Science, Department of Computer Science. The project addresses the urgent need for an effective flood management tool in Kenya, where annual floods cause significant economic losses, displacement of populations, and destruction of livelihoods.

### Project Objectives

*   **Real-Time Flood Forecasting:** Utilize hydrological and meteorological data to predict flood events.
    
*   **Alert Dissemination:** Deliver timely flood alerts via SMS and email.
    
*   **Incident Reporting:** Empower community members to submit flood reports, including multimedia attachments.
    
*   **Data-Driven Decision Making:** Provide dashboards and analytics for responders and administrators.
    
*   **Educational Resources:** Offer step-by-step guides, video tutorials, and downloadable resources on flood preparedness.
    
*   **Role-Based Access:** Facilitate different user experiences for community users, responders, and administrators.
    
*   **Multilingual Support:** Enhance accessibility by providing interfaces in multiple languages, including Swahili.
    

Features
--------

*   **Community Reporting:**Users can report flood incidents quickly and anonymously through web and mobile interfaces.
    
*   **Interactive User Dashboard:**Real-time displays of alerts, evacuation routes, flood reports, and resource statuses.
    
*   **Alert Management:**Automated alert generation based on real-time data and manual alert creation by administrators.
    
*   **SMS & Email Notifications:**Integration with third-party SMS gateways and email services for prompt alert dissemination.
    
*   **Geospatial Mapping:**Interactive maps displaying flood-prone areas, safe routes, and key facilities using tools such as Leaflet.js and OpenStreetMap.
    
*   **Educational Resources:**Access to instructional videos, articles, and guides on flood preparedness and disaster response.
    
*   **Multilingual Interface:**Support for multiple languages to ensure accessibility for diverse user groups.
    
*   **Admin Dashboard:**Advanced tools for administrators to verify reports, manage alerts, and analyze historical flood data.
    
*   **Resource Management:**Module for tracking and allocating critical resources such as medical kits, food supplies, and sanitation kits.
    

Architecture and Design
-----------------------

FMAS is built with a modular architecture to ensure scalability, maintainability, and robustness.

### Front-End

*   **Technologies:** React.js with TypeScript
    
*   **UI Components:** Interactive dashboards, maps, charts (using libraries like Chart.js, D3.js), and responsive forms
    
*   **Multilingual Support:** i18n integration for language toggling (English/Swahili)
    

### Back-End

*   **Technologies:** Node.js with Express.js
    
*   **APIs:** RESTful endpoints for handling user reports, alerts, notifications, and resource management
    
*   **Database:** MySQL for structured storage of user profiles, incident reports, alert history, and more
    
*   **Security:** JWT-based authentication, role-based access control (RBAC), and secure session management
    

### System Modules

*   **User Management Module:**Registration, login, and role assignment (admin, responder, community user).
    
*   **Flood Data Collection Module:**Integration with external APIs (e.g., meteorological data) and scheduled data updates.
    
*   **Alert Management Module:**Generation and dissemination of flood alerts through SMS, email, and dashboard notifications.
    
*   **Incident Reporting Module:**Community report submission, verification, and display of verified flood incidents.
    
*   **Resource and Infrastructure Management Module:**Tracking the availability of rescue resources and infrastructure conditions.
    
*   **Mapping and Safe Route Management Module:**Interactive maps with geospatial data, safe routes, and evacuation guidelines.
    
*   **Reporting and Analytics Module:**Generation of detailed reports for flood incidents, alert trends, and resource allocation.
    

Requirements
------------

### Functional Requirements

*   **Alert Dissemination:** Send flood alerts via SMS and email.
    
*   **Incident Reporting:** Allow community members to submit detailed flood reports.
    
*   **User Preferences:** Enable users to set alert preferences (severity, region, type).
    
*   **Educational Content:** Provide guides, videos, and downloadable resources on flood preparedness.
    
*   **Data Integration:** Incorporate real-time data from external sources such as the Kenya Meteorological Department and NDMU.
    
*   **Role-Based Access:** Different user experiences for community users, responders, and administrators.
    

### Non-Functional Requirements

*   **Performance:**Support up to 5000 concurrent users with 99.9% uptime and rapid response times (alerts within 5 seconds).
    
*   **Security:**Comply with data privacy regulations (GDPR, Kenya Data Protection Act) and implement robust encryption.
    
*   **Usability:**Intuitive, accessible interfaces for users of varying digital literacy levels.
    
*   **Scalability:**Modular design to facilitate future expansion to other disaster types.
    
*   **Cross-Platform:**Responsive design that works seamlessly on desktop and mobile devices.
    

Implementation Plan
-------------------

### Development Timeline

*   **Project Planning:**Requirement gathering and feasibility study (Weeks 1–8)
    
*   **Design Completion:**UI/UX design for web interfaces (Weeks 10–14)
    
*   **Back-End Development:**API and database implementation (Weeks 15–17)
    
*   **Front-End Development:**Dashboard and reporting interfaces (Weeks 18–19)
    
*   **Integration and Testing:**Connect with external APIs, system integration (Weeks 19–20)
    
*   **Full Deployment:**Rollout across target regions, user training (Week 20, April)
    
*   **Maintenance and Support:**Ongoing system updates and user support
    

### Key Activities

*   **Stakeholder Engagement:**Collaborate with NDMU, Kenya Red Cross, and local community representatives.
    
*   **User Training:**Organize workshops and provide comprehensive guides and tutorials.
    
*   **Awareness Campaigns:**Utilize social media, SMS, and community events to inform users.
    
*   **Maintenance:**Schedule regular system audits, backups, and performance monitoring.
    

Installation and Setup
----------------------

### Prerequisites

*   **Node.js** (v14 or above)
    
*   **MySQL** Database
    
*   **Git**
    

### Installation Steps

1.  bashCopyEditgit clone https://github.com/yourusername/Flood\_monitoring\_and\_alert\_system.gitcd Flood\_monitoring\_and\_alert\_system
    
2.  bashCopyEditcd Backnpm install
    
3.  envCopyEditPORT=3000JWT\_SECRET=your-secret-keyDB\_HOST=localhostDB\_USER=your\_db\_userDB\_PASSWORD=your\_db\_passwordDB\_NAME=your\_db\_nameTEXTSMS\_API\_KEY=your\_textsms\_api\_keyTEXTSMS\_PARTNER\_ID=your\_textsms\_partner\_idTEXTSMS\_SHORTCODE=your\_textsms\_shortcode
    
4.  bashCopyEditcd ../Front/Disaster-recovery-mainnpm install
    
5.  **Run the Application:**
    
    *   bashCopyEditcd ../../Backnpm start
        
    *   bashCopyEditcd ../Front/Disaster-recovery-mainnpm start
        

Usage
-----

*   **User Dashboard:**
    
    *   View real-time flood alerts and community reports.
        
    *   Access educational materials, safe routes, and resource information.
        
    *   Report flood incidents through an intuitive web form.
        
*   **Admin Dashboard:**
    
    *   Manage and verify community flood reports.
        
    *   Create, update, and dispatch alerts via SMS and email.
        
    *   Access analytical dashboards for resource allocation and incident trends.
        
*   **Mapping Module:**
    
    *   Interactive maps display flood-prone areas, safe routes, and key facilities.
        
    *   Users can toggle between different map layers for customized views.
        
*   **Multilingual Support:**
    
    *   Toggle between English and Swahili interfaces for ease of use.
        

Testing
-------

FMAS is rigorously tested to ensure reliability and performance. Testing strategies include:

*   **Unit Testing:**Validate individual API endpoints and UI components using Jest, Mocha, and React Testing Library.
    
*   **Integration Testing:**Use Postman and Selenium to verify interactions between the front-end, back-end, and database.
    
*   **Performance Testing:**Simulate high user loads using Apache JMeter.
    
*   **User Acceptance Testing (UAT):**Collaborate with stakeholders (e.g., Kenya Red Cross, NDMU) to ensure the system meets real-world needs.