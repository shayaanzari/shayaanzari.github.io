---
layout: ../layouts/Layout.astro
title: Backpropagation intro
description: Building up backpropagation rigorously
date: "2026-07-04"
---

# Backpropagation
The backprop algorithm differs for feedforward nets and other types of nets (such as recurrent), which have their own variants (such as Backpropagation Through Time).

We seek a general form.

## Feedforward Net
This section is based on [Nielsen's Neural Networks and Deep Learning, Chapter 2](http://neuralnetworksanddeeplearning.com/chap2.html#backpropagation_the_big_picture).

We will start by discussing the idea of backpropagation, move to deriving backpropagation for a standard feedforward neural network, and later consider the tensor notation for backpropagation, which will make defining backpropagation for other feedforward nets such as convolutional nets much simpler.

> [!note] Notation
> Let $C$ denote the cost function.
> 
> Let $z_j^l=\sum_k w_{jk}^l a_{k}^{l-1}+b_j^l$ be the weighted input of the $j$-th neuron in the $l$-th layer of the network in consideration. This is also called the pre-activation of that neuron, because the activation is $a_j^l=\sigma (z_j^l)$. 
> 
> Let $l$ denote the layer number, and $l=L$ denote the output layer.
> 
> Let $w_{jk}^l$ denote the weight in the $l$-th layer that connects the $k$-th neuron in the $l-1$th layer to the $j$-th neuron in the $l$-th layer. 
> For example, suppose a network has 5 neurons in its second last layer, which are fully connected to the 3 neurons in the output layer. Then the weight matrix applied at the input to the output layer is
>
> $$
> \mathbf{W}^L=\mqty(\xmat*{w^L}{3}{5})
> $$
>
> While it feels counterintuitive to have $w_{jk}$ describe a connection from $k$ to $j$, this convention used in textbooks proves its worth in vector notation. To illustrate, the vector of pre-activations at the output layer $\mathbf{z}^L$ is
> $$
> \mathbf{z}^L=\mathbf{W}^L\mathbf{a}^{L-1}+\mathbf{b}^L= \begin{bmatrix} w_{11}^L a_1^{L-1} + w_{12}^L a_2^{L-1} + w_{13}^L a_3^{L-1} + w_{14}^L a_4^{L-1} + w_{15}^L a_5^{L-1} + b_1^L \\ w_{21}^L a_1^{L-1} + w_{22}^L a_2^{L-1} + w_{23}^L a_3^{L-1} + w_{24}^L a_4^{L-1} + w_{25}^L a_5^{L-1} + b_2^L \\ w_{31}^L a_1^{L-1} + w_{32}^L a_2^{L-1} + w_{33}^L a_3^{L-1} + w_{34}^L a_4^{L-1} + w_{35}^L a_5^{L-1} + b_3^L \end{bmatrix}
> $$  
> where $\mathbf{a}^{L-1}$ is a $5\times 1$ vector containing the activations of the preceding layer and $\mathbf b^L$ is a $3\times 1$ vector of biases applied at the output layer.
> 
> To state it explicitly, the convention we are using for the organization of the weight matrix is:
> - number of rows = number of neurons in the output layer
> - number of columns = number of neurons in the input layer
> 
> Finally, let $n_{l}$ denote the number of neurons outputting in the layer of consideration $l$.
>    - For example, if the network takes in a 28 by 28 input (i.e. 784 input neurons), and ultimately outputs confidence values for 10 digits, then $n_1=784$ and $n_L=10$.


### Warmup / Sketch
We ultimately want to compute the partial derivatives $\partial C/\partial w_{jk}^l$ of the cost with respect to a generic weight $w^l_{jk}$. But for now we consider the partial derivative $\partial {C}/\partial {z_{j}^l}$ of the cost to a generic pre-activation $z_j^l$. Think of this as the *sensitivity* of the cost function with respect to the pre-activation of that specific neuron.

BP involves slightly changing the weighted input by modifying the weights, but we simplify and write $\Delta z_j^l$ as the change to the neuron's weighted input. The cost changes* by

$$
\Delta C\approx \pdv{C}{z_{j}^l}\Delta z_{j}^l
$$

> \*This is a first-order Taylor approximation of the cost that approaches equality as $\Delta z_j^l\to0$.

All cost functions in standard practice are nonnegative, and as such we wish to pick $\Delta z_j^l$ so that $\Delta C<0$ regardless of whether the derivative is positive or negative. We do this by choosing its sign to be opposite of $\partial{C}/\partial{z^l_j}$, i.e. defining our change to be proportional to the negative derivative:
$$
\Delta z_{j}^l=-\gamma \pdv{C}{z_{j}^l}
$$
where $\gamma$ is a tiny, positive step size (e.g. $10^{-4}$ in practice).

The change in the cost function is then
$$
\Delta C\approx-\gamma \left(\pdv{C}{z_{j}^l}\right)^2
$$
which is always negative.

> [!abstract] Recall
> Moving in the opposite direction of the derivative always drives the cost down, or keeps it flat if a minimum has already been reached.

Backpropagation relies on this idea of making small changes to drive down the cost.

### Derivation
Once more consider ${\partial C}/{\partial z_{j}^l}$, the sensitivity of the cost function $C$ to the $l$-th layer's $j$-th neuron's weighted input (aka pre-activation) $z_j^l$.

> [!tip]- Multivariable chain rule review
> $$
> \frac{dw}{d\textcolor{lime}t}=\pdv{w}{\textcolor{red}{x}}\frac{d\textcolor{red}x}{d\textcolor{lime}t}+\pdv{w}{\textcolor{orange}y}\frac{d\textcolor{orange}y}{d\textcolor{lime}t}+\pdv{w}{\textcolor{yellow}z}\frac{d\textcolor{yellow}z}{d\textcolor{lime}t}
> $$
> for functions $w(\textcolor{red}x,\textcolor{orange}y,\textcolor{yellow}z),\textcolor{red}x(\textcolor{lime}t),\textcolor{orange}y(\textcolor{lime}t)$ and $\textcolor{yellow}z(\textcolor{lime}t)$.
> 
> Also useful for intuition is the *total differential* formulation:
> $$
> dw=\pdv{w}{\textcolor{red}x}d\textcolor{red}x+\pdv{w}{\textcolor{orange}y}d\textcolor{orange}y+\pdv{w}{\textcolor{yellow}z}d\textcolor{yellow}z
> $$
> In general, where $w:\R^n\to \R$ for inputs $(x_1,\dotsc, x_n)$:
> $$
> \frac{dw}{d\textcolor{lime}t}=\sum_{i}\pdv{w}{x_{i}}\frac{dx_{i}}{d\textcolor{lime} t}
> $$
> 
> Colors inspired by the [Khan Academy](https://www.khanacademy.org/math/multivariable-calculus/multivariable-derivatives/differentiating-vector-valued-functions/a/multivariable-chain-rule-simple-version) article on the same topic.

#### Partial derivative of cost function w.r.t. any pre-activation in output layer
We first consider the sensitivity of the cost function to solely the pre-activations in the output layer, which we call $L$. Suppose there are $n$ output neurons. By the multivariate chain rule, the sensitivity can be written as
$$
\pdv{C}{z_{j}^L}=\sum_{k=1}^n\pdv{C}{a_{k}^L}\frac{da_{k}^L}{dz_{j}^L}
$$
To write this as in terms of vectors, define the vectors:
$$
\mathbf{z}^L=\begin{bmatrix}
z_{1}^L \\
\vdots \\
z_{n}^L
\end{bmatrix},\quad \mathbf{a}^L=\begin{bmatrix}
a^L_{1} \\
\vdots \\
a^L_{n}
\end{bmatrix}
$$
We are now computing $\partial C/\partial \mathbf{z}^L$, which we will call $\boldsymbol{\delta}^L$.
$$
\boldsymbol{\delta}^L:=\pdv{C}{\mathbf{z}^L}\tag{Sensitivity of Cost w.r.t. Output Layer}
$$
The left term on the RHS is naturally written as the gradient vector:
$$
\nabla_{\mathbf{a}^L}C=\begin{bmatrix}
\pdv{C}{a_{1}^L} \\
\vdots \\
\pdv{C}{a_{n}^L}
\end{bmatrix}\tag{Gradient w.r.t. activations}
$$
The right term requires a bit of nuance. We are not taking the derivative of a single function with respect to several functions, but we are taking the derivative of several functions with respect to several other functions. Let us formalize this idea.

We wish to take the derivative of the vector $\mathbf a^L$ with respect to each input $z_{j}^L$, contained in $\mathbf z^L$. The derivative of a vector-valued function with respect to an input vector is a matrix known as the *Jacobian*.
$$
\left(\pdv{\mathbf{a}^L}{\mathbf{z}^L}\right)=\begin{bmatrix}
\pdv{a_{1}^L}{z_{1}^L} & \pdv{a_{1}^L}{z_{2}^L} & \dots & \pdv{a_{1}^L}{z_{n}^L} \\ \pdv{a_{2}^L}{z_{1}^L} & \pdv{a_{2}^L}{z_{2}^L} & \dots & \pdv{a_{2}^L}{z_{n}^L} \\ \vdots & \vdots & \ddots & \vdots \\ \pdv{a_{n}^L}{z_{1}^L} & \pdv{a_{n}^L}{z_{2}^L} & \dots & \pdv{a_{n}^L}{z_{n}^L}
\end{bmatrix}\tag{Jacobian of Activations}
$$
Consider the dimensions of our resolved products in equation $(1A)$. The gradient of the cost function $\nabla_{\mathbf{a}^L}C$ is $n\times 1$, while the Jacobian $(\partial\mathbf{a}^L/ \partial\mathbf{z}^L)$ is $n\times n$. Since the dimensions of $\nabla_{\mathbf{a}^L}C\cdot (\partial\mathbf{a}^L/ \partial\mathbf{z}^L)$ would be $(n\times 1)\cdot (n\times n)$, the vector-matrix product is invalid; we cannot multiply the gradient by the Jacobian. To obtain the equivalent vector form $\delta^L$ of our original equation $(1A)$, we multiply the transpose of the Jacobian by the gradient, giving us a matrix-vector product.
$$
\boxed{\delta^L=\left(\pdv{\mathbf{a}^L}{\mathbf{z}^L}\right)^T\nabla_{\mathbf{a}^L}C}\tag{1B}
$$

> [!info]- A little quirk about the organization of matrices
> This may offer a bit more insight as to why we need to transpose.
> 
> The Jacobian *is* technically defined for a scalar-valued function, i.e. $f:\R^n\to\R$, then the Jacobian has only one row, which is the derivative of $f$ with respect to each of its inputs in left-to-right order. That is, the Jacobian for a scalar-valued function is simply the transpose of the gradient.  

> [!tip] Towards Generalized Backpropgation 
> Equation $(1B)$ is general in that it holds for any activation layer, and moreso for any computational system where vectors feed into vectors and collapse into a scalar (a sequence of vector transformations $\mathbf x_1\to\mathbf x_2\to\dotsb\to\mathbf x_n\to y$): the sensitivity of the output scalar to any intermediate vector is *always* the transpose of the local transition Jacobian multiplied by the downstream gradient.
> 
> If $g:\R^m\to\R^n$, $f:\R^n\to\R$, $\mathbf{x}\in\R^m$, $\mathbf{y}=g(\mathbf{x})$, and $z=f(\mathbf{y})$, then
> $$
> \pdv{z}{x_{i}}=\sum_{j}\pdv{z}{y_{j}}\pdv{y_{j}}{x_{i}}\quad\text{which is equivalent to}\quad\nabla_{\mathbf{x}}z=\left(\pdv{\mathbf{y}}{\mathbf{x}}\right)^\top\nabla_{\mathbf{y}}z
> $$
> 
> The gradient of a variable $\mathbf{x}$ can be obtained by multiplying a Jacobian matrix $\left(\pdv{\mathbf{y}}{\mathbf{x}}\right)$ by a gradient $\nabla_{\mathbf{y}}z$, an operation called a **Vector-Jacobian Product (VJP)**. 
> 
> The backpropagation algorithm consists of computing JVPs for each operation in the network. Every backward step in standard deep learning, including convolution and attention, fundamentally executes a VJP.
> 
> When the inputs are multiple dimensions, this form generalizes to tensors, which we cover in a later section.

> [!question]- Vector-Jacobian Product: But isn't the Jacobian on the left of the vector?
> Yes, but it's equivalent to $(\nabla_{\mathbf y}z)^T\left(\pdv{\mathbf y}{\mathbf x}\right)$. The version written above is what is discussed in literature and implemented in libraries.
> 
> [Read more](https://maximerobeyns.com/of_vjps_and_jvps) on VJP vs Jacobian-Vector Products (JVPs) and their uses in forward-mode and reverse-mode [automatic differentiation](https://en.wikipedia.org/wiki/Automatic_differentiation).

There is an additional form of equation $(1A)$ that will be useful at the time of implementation. 
While equation $(1B)$ is rigorous, keeping track of a full $n\times n$ matrix is a hog on memory. 

Most activation functions in practice are applied element-wise $\R\to\R$. As such, $a_j^L$ depends solely on $z_j^L$, so the rest of the partial derivatives $\partial{a_{k}^L}/\partial{z_{j}^L}$ where $k\neq j$ become 0. Thus, equation $(1A)$ for an element-wise activation function reduces to
$$
\pdv{C}{z_{j}^L}=\pdv{C}{a_{j}^L}\frac{da_{j}^L}{dz_{j}^L}\tag{1A}
$$
The Jacobian then looks like:
$$
\left(\pdv{\mathbf{a}^L}{\mathbf{z}^L}\right)=
\begin{bmatrix}
\pdv{a^L_{1}}{z_{1}^L}&0&\dotsb&0 \\
0&\pdv{a^L_{2}}{z_{2}^L} & \dotsb & 0 \\
\vdots & \vdots & \ddots&\vdots \\
0 & 0 & \dotsb & \pdv{a^L_{n}}{z_{n}^L}
\end{bmatrix}
$$
Since most of the entries are 0, our Jacobian matrix is diagonal, and a diagonal matrix acting on a vector is equivalent to scaling each element of the vector by the corresponding element. Hence, we can save space by stacking the partial derivatives $\pdv{a_i^L}{z_i^L}$ in a single vector and performing an element-wise multiplication between this vector and the gradient WRT activations. The notation of the Hadamard product $\odot$ is used to denote element-wise multiplication.

Let us define the vector valued function $\boldsymbol \sigma:\R^n\to\R^n$ and its corresponding derivative vector $\boldsymbol \sigma':\R^n\to\R^n$.
$$
\boldsymbol{\sigma}(\mathbf{x})=\begin{bmatrix}
\sigma(x_{1}) \\
\vdots \\
\sigma(x_{n})
\end{bmatrix},\quad \boldsymbol{\sigma}'(\mathbf{x})=\begin{bmatrix}
{\sigma}'(x_{1}) \\
\vdots \\
{\sigma}'(x_{n})
\end{bmatrix}\tag{Activation Vector}
$$

We can now write equation $(1B)$ in terms of the Hadamard product.
$$
\boxed{\delta^L=\boldsymbol \sigma'(\mathbf{z}^L)\odot \nabla_{\mathbf{a}^L}C}\tag{1C}
$$
This is the form which is typically implemented.

> [!question]- But what about $\sigma'(x)=\sigma(x)(1-\sigma(x))$?
> That is the derivative of the sigmoid activation function. We are assuming $\sigma$ is a generic activation function, that shares a few properties with sigmoid: namely, it is applied element-wise, and it is differentiable.
> 
> Examples of such activation functions include ReLU, GELU, SiLU, and tanh.
> Some activations are not applied elementwise, such as softmax.

#### Partial derivative of $C$ w.r.t. any pre-activation in any layer
Our application of the chain rule in equation $(1A)$ was not arbitrary- it was motivated by a rule of thumb, which we will explore in detail in this section.

Having resolved the sensitivity vector at the output layer ($\boldsymbol{\delta}^L$) with components
$$
\delta_{j}^L=\pdv{C}{z_{j}^L}=\sum^{n_{L}}_{k=1}\pdv{C}{a_{k}^L}\pdv{a_{k}^L}{z_{j}^L},
$$
Our goal is now to generalize this to any arbitrary layer $l$.
$$
\text{Want to resolve:}\quad \boldsymbol \delta^l=\pdv{C}{\mathbf{z}^{l}}
$$
There's more than one way to approach this. I find it easy to think in terms of induction.

Assume we have already computed the sensitivity vector $\boldsymbol{\delta}^{l+1}$ for layer $l+1$. We now wish to find the sensitivity vector $\boldsymbol{\delta}^l$ for layer $l$.

> [!info]- Mathematical Induction 
> Read the [Wikipedia intro](https://en.wikipedia.org/wiki/Mathematical_induction) on proofs by induction if you're unfamiliar. It's an indispensable tool.

It may be easier to see induction at play if we start by resolving $L-1$:
$$
\delta^{L-1}_{j}=\pdv{C}{z_{j}^{L-1}}
$$
Remember, we are going backward, so we consider what a generic pre-activation $z_j^{L-1}$ contributes to (not what contributes to $z_j^{L-1}$). In fact, within its own layer, $z_j^{L-1}$ only contributes to $a^{L-1}_j$, so by applying the chain rule the same way we did in $(1A)$:
$$
\pdv{C}{z_{j}^{L-1}}=\pdv{C}{a_{j}^{L-1}}\frac{ da_{j}^{L-1}}{dz_{j}^{L-1}}\tag{2A}
$$
and so the question becomes to find the sensitivity of $C$ to $a_j^{L-1}$.

Looking back at the multivariable chain rule, $C$ is ultimately a function of $(z_{1}^L,z_{2}^L,\dotsc,z^L_{n_{L}})$ the rigorous relationship of which is encompassed by equation $(1A)$. 

> [!info]- Example of multivariable chain rule with multiple levels of intermediate variables
> Consider a system of functions: 
> $$
> \begin{gather}
> w=f(y_{1},y_{2})
> \\y_{1}=g(x_{1},x_{2}),\quad y_{2}=h(x_{1},x_{2})
> \\x_{1}=u(t),\quad x_2=v(t)
> \end{gather}
> $$
> To find the total derivative $dw/dt$ we must account for each path of $t$ through the system.
> There are four paths:
> 
> $$
> \begin{aligned} 
> t \to u \to h \to w \quad &\text{corresponds to} \quad \frac{\partial w}{\partial y_{2}} \frac{\partial y_{2}}{\partial x_{1}} \frac{dx_{1}}{dt}
> \\ t \to u \to g \to w \quad &\text{corresponds to} \quad \frac{\partial w}{\partial y_{1}} \frac{\partial y_{1}}{\partial x_{1}} \frac{dx_{1}}{dt} 
> \\ t \to v \to h \to w \quad &\text{corresponds to} \quad \frac{\partial w}{\partial y_{2}} \frac{\partial y_{2}}{\partial x_{2}} \frac{dx_{2}}{dt}
> \\ t \to v \to g \to w \quad &\text{corresponds to} \quad \frac{\partial w}{\partial y_{1}} \frac{\partial y_{1}}{\partial x_{2}} \frac{dx_{2}}{dt} 
> \end{aligned}
> $$
> Summing up these terms:
> 
> $$
> \frac{dw}{dt}=\sum_{i}\sum_{j}\left(\pdv{w}{y_{i}}\pdv{y_{i}}{x_{j}}\frac{dx_{j}}{dt}\right)
> $$
> 

But "ultimately a function of" is a bit handwavy so let us investigate it explicitly.

The activation $a^{L-1}_j$ fans out, acting as an input to every neuron's preactivation $z_p^{L}$ in the directly succeeding layer $L$. To find the total sensitivity of $C$ to $a^{L-1}_j$, we sum across every path $p$ leading into layer $L$.
$$
\pdv{C}{a_{j}^{L-1}}=\sum^{n_{L}}_{p=1}\sum^{n_{L}}_{k=1}\pdv{C}{a_{k}^L}\pdv{a_{k}^L}{z_{p}^L}\pdv{z_{p}^L}{a_{j}^{L-1}}=\sum^{n_{L}}_{p=1}\biggl(\underbrace{\sum^{n_{L}}_{k=1}\pdv{C}{a_{k}^L}\pdv{a_{k}^L}{z_{p}^L}}_{\delta^L_{p}}\biggr)\pdv{z_{p}^L}{a_{j}^{L-1}}
$$
The term in the parentheses is exactly $\delta_p^L$, so we can write
$$
\pdv{C}{a_{j}^{L-1}}=\sum^{n_{L}}_{p=1}\delta_{p}^L\pdv{z_{p}^L}{a_{j}^{L-1}}
$$

This is an explicit way to come to this conclusion. 

Suppose we want the sensitivity of the cost function to a specific function $x$, and $y$ directly succeeds it in the chain of operations. We know that we can multiply the sensitivity of $x$ to $y$ by the sensitivity of the cost function. This is an informal way of applying the Vector-Jacobian product.

We simply consider that $a_j^{L-1}$ contributes to every $z_k^L$ in the output layer, so we must sum over each $z_{p}^L$'s path to $C$.
$$
\pdv{C}{a_{j}^{L-1}}=\sum^{n_{L}}_{p=1}\pdv{C}{z_{p}^L}\pdv{z_{p}^L}{a_{j}^{L-1}}=\sum^{n_{L}}_{p=1}\delta_{p}^L\pdv{z_{p}^L}{a_{j}^{L-1}}
$$

---

After arriving at the result through either of the above methods, it can be shown that the derivative with respect to a particular preceding activation is simply
$$
\pdv{z^L_{p}}{a_{j}^{L-1}}=w^L_{pj}
$$
This gives us the sensitivity of $C$ to $a_j^{L-1}$ as 
$$
\pdv{C}{a^{L-1}_{j}}=\sum^{n_{L}}_{p=1}\delta^L_{p}w^L_{pj}
$$
Substituting this and the derivative of an activation ($da^{L-1}_{j}/dz_{j}^{L-1}=\sigma'(z^{L-1}_{j})$) into equation $(2A)$:
$$
\pdv{C}{z_{j}^{L-1}}=\left(\sum^{n_{L}}_{p}\delta_{p}^Lw^L_{pj}\right)\sigma'(z_{j}^{L-1})\tag{2B}
$$
Lastly, it can be shown, by similar logic as for the Jacobian, that the weight matrix must be transposed to achieve the vector form of equation $(2B)$.
$$
\boxed{\pdv{C}{\mathbf{z}^{L-1}}=((\mathbf{W}^L)^T\boldsymbol{\delta}^L)\odot \boldsymbol \sigma'(\mathbf{z}^{L-1})}\tag{2C}
$$


#### Partial derivatives of cost w.r.t. weights/biases
We look at the directly succeeding term. Here, $w_{jk}^l$ is directly used in $z_j^l$. Once more, it would be rigorous to sum over the entire layer
$$
\pdv{C}{w_{jk}^l}=\sum^{n_{l}}_{p=1}\pdv{C}{z^l_{p}}\pdv{z^l_{p}}{w^l_{jk}}
$$
but the sum would reduce to just one term because only $z_j^l$ depends on $w^l_{jk}$:
$$
\pdv{C}{w_{jk}^l}=\pdv{C}{z^l_{j}}\pdv{z^l_{j}}{w^l_{jk}}\tag{3A}
$$
The first term is $\delta_j^l$, and it can be shown that $\partial z_j^l/\partial w^l_{jk}$ resolves to $a_k^{l-1}$, giving
$$
\pdv{C}{w_{jk}^l}=\delta^l_{j}a^{l-1}_{k}\tag{3B}
$$
It can be shown that the matrix form of this derivative is
$$
\boxed{\pdv{C}{\mathbf{W}^l}=\boldsymbol\delta^l(\mathbf{a}^{l-1})^T}\tag{3C}
$$

Finally, it can be shown using the same logic that $\pdv{C}{b^l_{j}}=\delta^l_{j}\tag{4A}$, which is vectorized as
$$
\boxed{\nabla_{\mathbf{b}^l}C=\boldsymbol\delta^l}\tag{4C}
$$

## Generalized Backprop via Tensors (work in progress)
This section is based on [Goodfellow's Deep Learning, Chapter 6.5](https://www.deeplearningbook.org/contents/mlp.html).

To denote the gradient of a value $z$ with respect to a tensor $\mathcal X$ (e.g. the parameter tensor for a convolutional filter), we write $\nabla_{\mathcal X}z$, just as if $\mathcal X$ were a vector. 

The indices into $\mathcal X$ now have multiple coordinates. For example, if the tensor is 3D, then it is indexed by three coordinates. Goodfellows maintains brevity by using a single variable $i$ to represent the complete tuple of indices. For all possible tuples $i$, 

$$
(\nabla_\mathcal Xz)_i =\pdv{z}{\mathcal X_i}
$$

which directly corresponds to how $(\nabla_\mathbf xz)_i=\partial z/\partial x_i$. Goodfellow then gives the *tensor chain rule* as:

$$
\nabla_{\mathcal X}z=\sum_{j}(\nabla_{\mathcal X}\mathcal Y_{j})\pdv{z}{\mathcal Y_{j}}
$$

where $\mathcal Y=g(\mathcal X)$ ,and $z=f(\mathcal Y)$.

Here $z$ may be interpreted as the scalar cost flowing backward, and $\mathcal Y_j$ represents the individual scalar components of an intermediate tensor $\mathcal Y$ (for example, the pre-activations or activations of a convolutional layer).

Reading section 6.5.6 in Goodfellow is encouraged as a written alternative to the build in Karpathy's lecture 1.