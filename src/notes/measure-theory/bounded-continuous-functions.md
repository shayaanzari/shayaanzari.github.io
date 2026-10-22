---
title: "Space of Bounded Continuous Functions is Banach"
description: "Proof that (C_b(X), ‖·‖_∞) is a complete normed vector space"
section: "Prerequisites"
date: "2026-10-22"
---

# Space of Bounded Continuous Functions is Banach

> [!note] Why Functional Analysis in a Measure Theory Course?
> If you are wondering why notes on measure theory begin with complete normed vector spaces and Cauchy sequences of functions, there is a deep structural motivation.
>
> The classical Riemann integral suffers from a fatal deficiency: the space of Riemann-integrable functions is **incomplete** under integral norms (a sequence of Riemann-integrable functions can converge under an integral norm to something that fails to be Riemann-integrable). Modern analysis demands function spaces (like $L^1, L^2, L^p$) that are complete—spaces where every Cauchy sequence has a legitimate limit.
>
> Measure theory and the Lebesgue integral exist precisely to construct these complete spaces. Before building Lebesgue measure from scratch, examining $(C_b(X), \lVert \cdot \rVert_\infty)$ gives us our first concrete, well-behaved model of a Banach space, contrasts pointwise versus uniform convergence, and previews the functional-analytic viewpoint that later underpins duality theorems (such as the Riesz–Markov–Kakutani representation theorem).

Let $X$ be a *metric space*. The space of all bounded, continuous, *complex-valued* functions on $X$ is denoted:
$$C_b(X) = \{f: X \to \mathbb{C} \mid f \text{ is continuous and } \sup_{x \in X} \vert{}f(x)\vert{} < \infty\}$$
equipped with the *supremum norm*
$$\Vert{}f\Vert{}_\infty = \sup_{x \in X} \vert{}f(x)\vert{}$$
Notice that we have specified three additional things: a metric space, the codomain is a field ($\R$ or $\C$), and the supremum norm.

> [!abstract] Theorem: $(C_b(X),\lVert {}\cdot {}\rVert_\infty)$ is a Banach Space.

Recall that a Banach space is a complete normed vector space.

## Part 1: Norm Axioms
We show that $\lVert {}\cdot {}\rVert_\infty$ is a norm on $C_b(X)$. 
Suppose $f,g\in C_b(X)$.
You can verify the three conditions:
1. Positive definiteness: $\lVert f \rVert_\infty\ge0$, and zero norm implies $f=0$
2. Absolute homogeneity: show that $\lVert \alpha f \rVert_\infty=\lvert \alpha \rvert\lVert f \rVert_\infty$.
3. Triangle inequality: show that $\lVert f+g \rVert_\infty\le\lVert f \rVert_\infty+\lVert g \rVert_\infty$

## Part 2: Completeness of $(C_b(X),\lVert {}\cdot {}\rVert_\infty)$

### 2A: Pointwise Limit Exists
We show the existence of the limit of an arbitrary Cauchy sequence of functions in $C_b(X)$.

Let $f_1,f_2,\dotsc$ be a Cauchy sequence of functions in $C_b(X)$.

By definition of Cauchy sequence, for every $\epsilon>0$, there exists $N\in\N$ such that
$$
\lVert f_n-f_m \rVert _\infty<\epsilon\quad\text{for all}\ n,m\ge N
$$
By definition of our norm,
$$
\sup_{x\in X}|f_n-f_m |<\epsilon\quad\text{for all}\ n,m\ge N
$$
By definition of sup, for any particular $x\in X$,
$$
|f_n(x)-f_m(x)|\le \sup_{x\in X}|f_n-f_m |<\epsilon\quad\text{for all}\ n,m\ge N\tag{1}
$$
Now fix a particular $x\in X$. By the inequality in $(1)$, the difference of values attained, not just the supremum of the difference, is less than an arbitrary $\epsilon$, so the sequence of complex values $f_1(x),f_2(x),\dotsc$ is Cauchy. (In contrast to the sequence of functions which is Cauchy by assumption).

Because $\C$ is complete, $f_1(x),f_2(x),\dotsc$ converges—we'll say it converges to $L_x\in \C$.

> [!tip] Interlude: $f$ is unique.
> Limits in metric spaces are unique, so for each $x\in X$, there is only one limit $L_x$ attained. We define $f$ to be the function that maps $x$ to that unique limit.
> $$f(x):=L_x=\lim_{ n \to \infty } f_n(x)$$

Thus, $f_1,f_2,\dotsc$ converges pointwise to $f$.

### 2B: Uniform Convergence
Picking up from pointwise convergence, we show that $f_1,f_2,\dotsc$ converges uniformly to $f$.

Fix arbitrary $\epsilon>0$. Start from the Cauchy condition: choose $N$ such that
$$
|f_n(x)-f_m(x)|<\epsilon\quad\text{for any }x\in X\text{ and for all }n,m\ge N
$$
We want to show that for all $n\ge N$ and for all $x\in X$, $|f_n(x)-f(x)|\le \epsilon$. So, fix $n\ge N$, and fix $x\in X$. We have
$$
|f_n(x)-f_m(x)|<\epsilon\quad\text{for all }m\ge N
$$
Take the limit as $m\to\infty$. By pointwise convergence, we know that $\lim_{ m \to \infty }f_m(x)=f(x)$. Hence,
$$
\lim_{ m \to \infty } |f_n(x)-f_m(x)|=|f_n(x)-f(x)|\le \epsilon
$$
Since $x$ was arbitrary, the result has been shown.

### 2C: The Limit Exists in $C_b(X)$
Using the uniform bound from 2B, we show that $f\in C_b(X)$, i.e. we prove that $f$ is bounded (finite supremum norm) and continuous. 

1. $f$ is bounded.
Note that for any $\epsilon>0$, there exists $N\in\N$, such that for all $x\in X$ and $n\ge N$, we have that
$$
|f_n(x)-f(x)|\le \epsilon
$$
Since supremum is the smallest upper bound,
$$
\sup_{x\in X}|f_n(x)-f(x)|\le \epsilon\quad\text{ for all }n\ge N
$$
Which is semantically the same as
$$
\lVert f_n-f \rVert _\infty\le \epsilon\quad\text{ for all }n\ge N
$$
We want to show that $\lVert f \rVert_\infty< \infty$. Pick some $n_0$ such that $\lVert f_{n_0}-f \rVert<\epsilon$. By the triangle inequality,
$$
\lVert f \rVert _\infty=\lVert (f-f_{n_0})+f_{n_0} \rVert_\infty\le \lVert f-f_{n_0} \rVert _\infty+\lVert f_{n_0} \rVert _\infty\le \epsilon+\lVert f_{n_0} \rVert _\infty  
$$
By assumption, $f_{n_0}\in C_b(X)$ and thus is bounded with respect to the norm, i.e. $\lVert f_{n_0} \rVert<\infty$. Hence, $\epsilon+\lVert f_{n_0} \rVert<\infty$.

2. $f$ is continuous.
This one is a fun puzzle. Fix $x_0\in X$ and let $\epsilon>0$ be given. Hint: Since $f_n\in C_b(X)$, start by drawing a neighborhood around $x_0$ using the continuity of $f_n$.
