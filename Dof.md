React Depth of Field
=========

A module built to allow you to easily apply a dynamic, interactive depth of field effect to an arbitrary set of elements. React-dof allows for smooth focus transitions across a set of elements.

## Demos

  * <a href="" target="_blank">__Transitions__</a>
  * <a href="" target="_blank">__Blur Intensities__</a>

## Table of Contents

* [Installation](#installation)
* [Features](#features)
* [Quickstart](#quickstart)
* [Compatibility](#compatibility)
* [API Reference](https://github.com/joshwcomeau/react-flip-move/blob/master/documentation/api_reference.md)
* [Gotchas](#gotchas)
* [Known Issues](#known-issues)
* [Contributions](#contributions)
* [Development](#development)
* [Flow support](#flow-support)
* [License](#license)



## Installation

```bash
npm i -S react-dof
```

## Features

* Focus panning - react-dof will sequentially 'pan focus' across a set of elements.
* Adjustable transition speed - using the transitionSpeed prop, you can set the time duration of a focus pan.

##Quickstart

To use react-dof, simply wrap the desired elements in a ‘DofContainer’ and apply any custom options you see fit.

```jsx
import DofContainer from 'react-dof';

const ImageGallery = ({ images }) => (
  <DofContainer blurStrength={4} transitionSpeed={200} />
    {images.map(image => (
      <Image key={image.id} {...image} />
    ))}
  </FlipMove>
);
```

## Compatibility

|           | Chrome | Firefox | Safari |   IE  | Edge | iOS Safari/Chrome | Android Chrome |
|-----------|:------:|:-------:|:------:|:-----:|:----:|:-----------------:|:--------------:|
| Supported |  ✔ 10+ |   ✔ 4+  | ✔ 6.1+ | ✔ 10+ |   ✔  |       ✔ 6.1+      |        ✔       |

## API Reference

React-dof is a React component, and is configured via the following props:

### `blurIncrement`

| **Accepted Types:** | **0** |
|---------------------|-------------------|
|  `Number` | `undefined` |

The amount, in pixels, to be added to the blur intensity of each subsequent element.

For example, if you have five elements and were to target element three, adjacent elements will blur by an incremement of 2px as follows:

* Element 0 = __4px__
* Element 1 = __2px__
* Element 2 = __0px__ [target]
* Element 3 = __2px__
* Element 4 = __4px__

### `focusTransitionSpeed`

| **Accepted Types:** | **0** |
|---------------------|-------------------|
|  `Number` | `undefined` |

The length, in milliseconds, that the focus transition ought to take.

### `initialIndex`

| **Accepted Types:** | **0** |
|---------------------|-------------------|
|  `Number` | `undefined` |

The index of the child element initially in focus. By default, the first child, or '0' is in focus.

## Licence

MIT
