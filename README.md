![Markdown logo](https://img.shields.io/badge/React-exercise-brightgreen.svg)

### Props

### State

## React component composition cheatsheet

This is a small list of common techniques used in React
to compose and enhance components. Feel free to create
Pull Requests with further techniques or fixes.

#### Basic containment

Elements can be passed as children into components.

```jsx
const Layout = ({ children, theme }) => (
  <div className={`theme-${theme}`}>
    <main>{children}</main>
  </div>
);

const Content = () => (
  <div>Some fancy content</div>
);

ReactDOM.render(
  <Layout theme='dark'>
    <Content />
  </Layout>
, containerEl);
```

#### Containment with multiple slots using children

Children are not limited to being elements. You can pass basically anything,
including plain objects.

```jsx
const Layout = ({ children, theme }) => (
  <div className={`theme-${theme}`}>
    <header>{children.header}</header>
    <main>{children.content}</main>
    <footer>{children.footer}</footer>
  </div>
);

const Header = () => (
  <h5>Header title</h5>
);

const Footer = () => (
  <em>footer note</em>
);

const Content = () => (
  <div>Some fancy content</div>
);

ReactDOM.render(
  <Layout theme='dark'>
    {{
      header: <Header />,
      content: <Content />,
      footer: <Footer />
    }}
  </Layout>
, containerEl);
```

### Containment with multiple slots using props

Elements can also be passed in using props.

```jsx

const Layout = ({ header, content, footer, theme }) => (
  <div className={`theme-${theme}`}>
    <header>{header}</header>
    <main>{content}</main>
    <footer>{footer}</footer>
  </div>
);

const Header = () => (
  <h5>Header title</h5>
);

const Footer = () => (
  <em>footer note</em>
);

const Content = () => (
  <div>Some fancy content</div>
);

ReactDOM.render(
  <Layout
    theme='dark'
    header={<Header />}
    content={<Content />}
    footer={<Footer />}
  />
, containerEl);
```

#### Enhancing contained elements

It's possible to enhance certain elements with additional props using
`React.cloneElement`.

```jsx
const Layout = ({ children, theme }) => (
  <div className={`theme-${theme}`}>
    <main>{React.cloneElement(children, { theme })}</main>
  </div>
);

const Content = ({ theme }) => (
  <div>Currently using this theme: {theme}</div>
);

ReactDOM.render(
  <Layout theme='dark'>
    <Content />
  </Layout>
, containerEl);
```

#### Passing components as props

Like elements, you can also pass components in using props.

```jsx
const Layout = ({ children, contentComponent, theme }) => {
  const ContentComponent = contentComponent;
  return (
    <div className={`theme-${theme}`}>
      <main><ContentComponent theme={theme} /></main>
    </div>
  );
};

const Content = ({ theme }) => (
  <div>Currently using this theme: {theme}</div>
);

ReactDOM.render(
  <Layout
    theme='dark'
    contentComponent={Content}
  />
, containerEl);
```

#### Higher Order Components (HOC)

Higher Order Components are functions which get a component passed in as argument and
return a new component.

```jsx
function createComponentWithDefaultProps(WrappedComponent, defaultProps) {
  return (props) => (
      <WrappedComponent {...defaultProps} {...props} />
  );
}

const Layout = ({ children, theme }) => (
  <div className={`theme-${theme}`}>
    <main>{children}</main>
  </div>
);

const DarkLayout = createComponentWithDefaultProps(Layout, { theme: 'dark' });

ReactDOM.render(
  <DarkLayout>Some content</DarkLayout>
, containerEl);
```

#### Using functions as children

Since children can be anything, they can also be functions.

```jsx
class FetchTheme extends React.Component {

  constructor() {
    super();
    this.state = {
      theme: null
    };
  }

  componentDidMount() {
    fetch('/api/currentTheme')
      .then((res) => res.text())
      .then(((theme) => {
        this.setState({ theme });
      }));
  }

  render() {
    const { children } = this.props;
    const { theme } = this.state;
    return theme ? children(theme) : null;
  }
}

const Layout = ({ children, theme }) => (
  <div className={`theme-${theme}`}>
    <main>{children}</main>
  </div>
);

ReactDOM.render(
  <FetchTheme>
  {
    (theme) => (
      <Layout theme={theme}>Some content</Layout>
    )
  }
  </FetchTheme>
, containerEl);
```

#### When should I use each?

|   Class Component                 |   Stateless Component      |
|:----------------------:           |:-----------------:         |
| State                             |  Everywhere else           |
| Refs                              |                            |
| Lifecycle methods                 |                            |
| Child functions (for performance) |                            |

#### When to use?

|   Container Component(Smart, Stateful, Controller View)   |   Presentation Component(Dumb, Stateless, View)      |
|:---------------------------------------------------------:|:----------------------------------------------------:|
| Little to no markup                                       |  Nearly all markup                                   |
| Focus on how things work                                  |  Focus on how things looks                           |
| Pass data and actions down/subscribe to Redux State       |Receive data and actions via props                    |
| Knows about Redux                                         |Doesn’t know about Redux                              |
| Often stateful                                            |Typically functional components                       |
| Dispatch Redux actions                                    |Invoke callbacks on props                             |
| Generated by react-redux                                  |Written by hand                                       |


>”When you notice that some components don’t use props they
>receive but merely forward them down…it’s a good time to introduce
>some container components.”
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; *~Dan Abramov*

#### State management

|   Flux                                                    |                       Redux                          |
|:---------------------------------------------------------:|:----------------------------------------------------:|
| Stores contain state and change logic                     |  Store and change logic are separate                 |
| Multiple stores                                           |One store                                             |
| Flat and disconnected stores                              |Single store with hierarchical reducers               |
| Singleton dispatcher                                      |No dispatcher                                         |
| React components subscribe to stores                      |Container components utilize connect                  |
| State is mutated                                          |State is immutable                                    |

#### 3 Principles of Redux
- Immutable Store
- Actions trigger changes
- Reducers return updated state

#### Handling Immutable State

|   ES6          |     ES5       |   Libraries        |
|:--------------:|:-------------:|:------------------:|
| Object.assign  |  Lodash merge |react-addons-update |
| Spead operator | Lodash extend |Immutable.js        |
|                |Object-assign  |                    |

