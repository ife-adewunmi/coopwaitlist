# coopwaitlist

# Coop Waitlist

Coop Waitlist is a modern web application built with Next.js to manage and organize waitlists for cooperative housing opportunities. The platform bridges the gap between property managers and potential residents by providing a streamlined interface for waitlist registration, status tracking, and management.

## 🚀 Features

- **User Registration & Authentication**: Secure account creation and login functionality
- **Waitlist Application**: Easy-to-use forms for joining housing waitlists
- **Profile Management**: User dashboard to update personal information and preferences
- **Status Tracking**: Real-time updates on waitlist position and application status
- **Notification System**: Email alerts for waitlist status changes
- **Admin Dashboard**: Comprehensive tools for property managers to manage waitlists

## 💻 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: Radix UI primitives with custom styling
- **Styling**: Tailwind CSS with animations
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: Redux Toolkit
- **Notifications**: Sonner Toast notifications
- **Animations**: Framer Motion
- **Theme**: Dark/Light mode support via next-themes

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or higher
- Yarn package manager

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/ife-adewunmi/coopwaitlist.git
   cd coopwaitlist
   ```

2. Install dependencies
   ```bash
   yarn install
   ```

3. Run the development server
   ```bash
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## 📝 Contributing

Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Creating Issue from PR

To create a follow-up issue when merging a PR, include this in your PR description:

   ```bash
   /create-issue
   title: Implement missing feature X
   body: We need to implement feature X that was out of scope for this PR:
   - [ ] Design component
   - [ ] Write tests
   - [ ] Update documentation
   labels: enhancement
   /end-issue
   ```