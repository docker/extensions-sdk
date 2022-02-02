#  UI Guidelines

We are currently in the process of developing our design system but in the meantime, here are some [UI guidelines](https://www.figma.com/file/U7pLWfEf6IQKUHLhdateBI/Docker-Design-Guidelines?node-id=1%3A28771). Docker Desktop's UI is written in React and [Material-UI](https://mui.com/), and we strongly recommend adopting this combination in your extensions as well. This brings the benefit of using our [Material-UI Theme](https://www.npmjs.com/package/@docker/docker-mui-theme) to easily replicate Docker Desktop's look & feel, and we'll continue to release libraries and utilities targeting this combination.

# Design Principles
At Docker we are developer obsessed, which means that we intend to build tools that can be seamlessly integrated into their workflow rather than them having to change their workflow in order to use the tool. Here are a few design principles that have facilitated us to do this and would strongly recommend that you take them into consideration when building extensions.

### Clear Call-to-Actions
When using call-to-actions, use familiar terms that do not have an ambiguous meaning.  Avoid using too many call-to-actions on one page, wherever possible. If there is a need to use multiple call-to-actions, ensure the hierarchy is conveyed through the use of primary and secondary actions.

Here is an an example of the use of a primary (Save) and a secondary (Cancel) button

![UI Extension](images/cta-example.png)


### Use the UI
The advantage we have with Docker Desktop over the CLI is that we have the opportunity to provide rich information to users. Make use of this interface as much as possible. Avoid embedding terminal windows wherever not necessary.

### Build Native Features

In order not to disrupt the flow of users, try to avoid scenarios where the user is redirected to a web page to configure settings, view information etc.  Build features natively wherever possible, to ensure a seamless experience for users.

### Break down complicated flows into steps

If a flow is too complicated or the concept is abstract, consider breaking down the flow into multiple steps with one simple call-to-action in each step, this is likely to help when onboarding novice users to that tool/extension.  In addition to this, provide contextual help instead of redirecting them to elaborate documentation wherever applicable. 

### Visibility of Status

Ensure that the current status of the extension is always made visible and clear to users. This helps users feel in control and know what steps they have to take in order to reach their intended outcome.  An example of a status could be “ <extension name> is currently connecting to the remote cluster.”

### User-Friendly  Messages

When showing messages to the user such as those when an error occurs, avoid using detailed technical messages that rely on understanding low-level details. Use simple and concise messages with possible next steps so that user knows how to remedy the situation (if needed).




