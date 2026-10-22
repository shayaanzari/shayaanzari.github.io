---
title: "Limits Superior and Inferior"
description: "A comprehensive treatment of sup, inf, and the equivalent formulations of limsup and liminf for sequences and sets."
section: "Prerequisites"
date: "2026-10-11"
draft: true
---

# Limits Superior and Inferior

In introductory analysis, sequences of numbers or sets that oscillate—such as $a_n = (-1)^n$ or sequences of alternating intervals—are classified as divergent. In measure theory and integration, however, we routinely encounter sequences of measurable sets and functions where ordinary pointwise limits fail to exist. 

Discarding oscillating sequences is not an option when building integration theories or proving probability theorems. The limit superior ($\limsup$) and limit inferior ($\liminf$) provide the remedy: in the extended real line $[-\infty, \infty]$ and in the algebra of sets, **they always exist**. 

This note develops the foundations of $\sup$ and $\inf$, explores why they govern measure-theoretic arguments, and presents the various equivalent formulations of $\limsup$ and $\liminf$ for numbers and sets.

---

## 1. Supremum and Infimum: A Rapid Review

Let $S \subseteq \mathbb{R}$ be a non-empty set of real numbers.

- An upper bound for $S$ is a number $M \in \mathbb{R}$ such that $x \le M$ for all $x \in S$. The **supremum** (or least upper bound), denoted $\sup S$, is the minimum of all upper bounds:
  1. $x \le \sup S$ for all $x \in S$.
  2. If $M < \sup S$, then $M$ is not an upper bound for $S$.

- Dually, a lower bound for $S$ is a number $m \in \mathbb{R}$ such that $x \ge m$ for all $x \in S$. The **infimum** (or greatest lower bound), denoted $\inf S$, is the maximum of all lower bounds.

In the extended real numbers $\overline{\mathbb{R}} = [-\infty, +\infty]$, by convention we define:
$$
\sup \emptyset = -\infty, \qquad \inf \emptyset = +\infty,
$$
and if $S$ is unbounded above, $\sup S = +\infty$; if unbounded below, $\inf S = -\infty$. With these conventions, **every** subset of $\overline{\mathbb{R}}$ possesses an infimum and a supremum.

### The $\varepsilon$-Characterization

Working directly with upper/lower bounds can be cumbersome. In proofs, we frequently invoke the alternative $\varepsilon$-characterization:

> [!note] $\varepsilon$-Characterization of Sup and Inf
> Let $S \subseteq \mathbb{R}$ be non-empty and bounded.
> 
> 1. A number $M = \sup S$ if and only if:
> 
>    $$
>    \begin{cases} 
>    \text{(i) } x \le M \quad \text{for all } x \in S, \\ 
>    \text{(ii) } \forall\,\varepsilon > 0, \; \exists\, x \in S \text{ such that } x > M - \varepsilon.
>    \end{cases}
>    $$
> 
> 2. A number $m = \inf S$ if and only if:
> 
>    $$
>    \begin{cases} 
>    \text{(i) } x \ge m \quad \text{for all } x \in S, \\ 
>    \text{(ii) } \forall\,\varepsilon > 0, \; \exists\, x \in S \text{ such that } x < m + \varepsilon.
>    \end{cases}
>    $$

Intuitively: to show that $M$ is the supremum, we show that no element of $S$ exceeds $M$, but if we step even an infinitesimal distance $\varepsilon$ to the left of $M$, we immediately bump into an element of $S$.

### Why $\sup$ and $\inf$ Pervade Measure Theory

Why is almost every fundamental definition in measure theory written in terms of suprema and infima rather than ordinary limits?

1. **Approximation from Outside and Inside (Outer Measures & Regularity):** Arbitrary sets in $\mathbb{R}^n$ can have jagged, pathological boundaries that cannot be evaluated with standard geometry. We measure them by approximating:
   $$\mu^*(E) = \inf \left\{ \sum_{k=1}^\infty \operatorname{vol}(I_k) : E \subseteq \bigcup_{k=1}^\infty I_k \right\}$$
   We take the *infimum* over all countable open coverings. Similarly, inner regularity approximates measurable sets from within via the *supremum* over compact subsets.
2. **The Lebesgue Integral:** The Riemann integral partitions the domain $[a, b]$ into fine meshes. The Lebesgue integral instead partitions the *range* and approximates a non-negative function $f$ from below by simple functions:
   $$\int_E f \, d\mu = \sup \left\{ \int_E \phi \, d\mu : 0 \le \phi \le f, \; \phi \text{ is simple} \right\}$$
   The supremum guarantees that the integral is well-defined for *any* non-negative measurable function, finite or infinite.
3. **Lattice Completeness of $\overline{\mathbb{R}}$:** Measure theory admits sets of measure $+\infty$ and functions that evaluate to $\pm\infty$. In $\overline{\mathbb{R}}$, monotone sequences cannot escape or fail to have limits due to missing endpoints. The completeness of $\overline{\mathbb{R}}$ as an ordered lattice ensures our analytic machinery never breaks down.

---

## 2. Limits Superior and Inferior for Sequences of Numbers

Let $(a_n)_{n=1}^\infty$ be a sequence in $\overline{\mathbb{R}}$. Even if $\lim_{n \to \infty} a_n$ does not exist, the sequence's tails contain rich asymptotic information.

### Formulation 1: The Monotone Tails / Inf-Sup Formulation

For each index $n \in \mathbb{N}$, consider the $n$-th tail of the sequence:
$$
T_n = \{a_k : k \ge n\} = \{a_n, a_{n+1}, a_{n+2}, \dots\}
$$
As $n$ increases, the tail shrinks by dropping terms: $T_1 \supseteq T_2 \supseteq T_3 \supseteq \cdots$.

Now evaluate the supremum and infimum of each tail:
$$
s_n = \sup_{k \ge n} a_k = \sup T_n, \qquad i_n = \inf_{k \ge n} a_k = \inf T_n.
$$
Because the supremum of a subset cannot exceed the supremum of a larger set ($A \subseteq B \implies \sup A \le \sup B$), the tail suprema form a **monotonically decreasing** sequence:
$$
s_1 \ge s_2 \ge s_3 \ge \cdots
$$
Dually, the tail infima form a **monotonically increasing** sequence:
$$
i_1 \le i_2 \le i_3 \le \cdots
$$
Every monotone sequence in $\overline{\mathbb{R}}$ has a limit, which coincides with its infimum (for decreasing sequences) or supremum (for increasing sequences). This gives the standard definition:

> [!note] Inf-Sup Definition
> The **limit superior** and **limit inferior** of $(a_n)$ are defined by:
> $$
> \limsup_{n \to \infty} a_n = \lim_{n \to \infty} \left( \sup_{k \ge n} a_k \right) = \inf_{n \ge 1} \left( \sup_{k \ge n} a_k \right)
> $$
> $$
> \liminf_{n \to \infty} a_n = \lim_{n \to \infty} \left( \inf_{k \ge n} a_k \right) = \sup_{n \ge 1} \left( \inf_{k \ge n} a_k \right)
> $$

Because $i_n \le a_n \le s_n$ for every $n$, taking limits immediately yields:
$$
\inf_{k \ge 1} a_k \le \liminf_{n \to \infty} a_n \le \limsup_{n \to \infty} a_n \le \sup_{k \ge 1} a_k.
$$

### Formulation 2: Accumulation Values (Subsequential Limits)

A point $L \in \overline{\mathbb{R}}$ is an **accumulation value** (or subsequential limit) of $(a_n)$ if there exists a subsequence $(a_{n_k})_{k=1}^\infty$ such that $\lim_{k \to \infty} a_{n_k} = L$.

Let $\mathcal{L} \subseteq \overline{\mathbb{R}}$ be the set of all subsequential limits of $(a_n)$:
$$
\mathcal{L} = \left\{ L \in \overline{\mathbb{R}} : \exists \, \text{subsequence } (a_{n_k}) \text{ with } a_{n_k} \to L \right\}.
$$

> [!tip] Extremal Subsequential Limits
> The set $\mathcal{L}$ is non-empty and closed in $\overline{\mathbb{R}}$. Furthermore:
> $$
> \limsup_{n \to \infty} a_n = \max \mathcal{L} = \sup \mathcal{L}
> $$
> $$
> \liminf_{n \to \infty} a_n = \min \mathcal{L} = \inf \mathcal{L}
> $$

In words: **$\limsup a_n$ is the largest possible limit achievable by any subsequence**, and **$\liminf a_n$ is the smallest possible limit achievable by any subsequence**.

### Formulation 3: The $\varepsilon$-Neighborhood Formulation

When $L = \limsup_{n \to \infty} a_n$ is a finite real number, how do the terms $a_n$ behave relative to $L$?

> [!note] $\varepsilon$-Characterization of Limits Superior and Inferior
> Let $L, m \in \mathbb{R}$.
> 
> 1. $L = \limsup_{n \to \infty} a_n$ if and only if for every $\varepsilon > 0$:
>    - $a_n < L + \varepsilon$ for all but finitely many $n$ (*eventually*), and
>    - $a_n > L - \varepsilon$ for infinitely many $n$ (*frequently*).
> 
> 2. $m = \liminf_{n \to \infty} a_n$ if and only if for every $\varepsilon > 0$:
>    - $a_n > m - \varepsilon$ for all but finitely many $n$ (*eventually*), and
>    - $a_n < m + \varepsilon$ for infinitely many $n$ (*frequently*).

This reflects the intuitive geometry: the sequence can never stay above $L + \varepsilon$ (it eventually drops below any ceiling higher than $L$), yet it repeatedly visits $(L - \varepsilon, L + \varepsilon)$ infinitely many times.

### Criterion for Ordinary Convergence

The relationship between the ordinary limit and the limit superior/inferior is given by:

$$
\lim_{n \to \infty} a_n = L \iff \liminf_{n \to \infty} a_n = \limsup_{n \to \infty} a_n = L.
$$

If $\liminf a_n < \limsup a_n$, the sequence oscillates asymptotically between multiple accumulation values.

### Application: Pointwise Limits of Sequences of Functions

In measure theory, one rarely deals with isolated numerical sequences; rather, the primary objects of study are sequences of functions $f_n : X \to \overline{\mathbb{R}}$ (such as step approximations, probability densities, or random variables).

Because each point $x \in X$ produces a numerical sequence $(f_n(x))_{n=1}^\infty$ in $\overline{\mathbb{R}}$, limits superior and inferior extend pointwise:

> [!tip] Limit Superior and Inferior Functions
> Let $f_n : X \to \overline{\mathbb{R}}$ for each $n \in \mathbb{N}$. The **limit superior** and **limit inferior functions** are defined pointwise for each $x \in X$:
> 
> $$
> (\limsup_{n \to \infty} f_n)(x) := \limsup_{n \to \infty} f_n(x) = \inf_{n \ge 1} \sup_{k \ge n} f_k(x)
> $$
> 
> $$
> (\liminf_{n \to \infty} f_n)(x) := \liminf_{n \to \infty} f_n(x) = \sup_{n \ge 1} \inf_{k \ge n} f_k(x)
> $$

Geometrically, this corresponds to tracking **envelope functions** of the tails:
- The tail suprema $g_n(x) := \sup_{k \ge n} f_k(x)$ form a monotonically decreasing sequence of upper envelopes: $g_1 \ge g_2 \ge g_3 \ge \cdots$.
- The tail infima $h_n(x) := \inf_{k \ge n} f_k(x)$ form a monotonically increasing sequence of lower envelopes: $h_1 \le h_2 \le h_3 \le \cdots$.

As $n \to \infty$, the upper envelopes descend pointwise to $\limsup f_n$, and the lower envelopes ascend pointwise to $\liminf f_n$. The ordinary pointwise limit exists if and only if these two bounding envelopes pinch together:
$$
\lim_{n \to \infty} f_n(x) = f(x) \iff \limsup_{n \to \infty} f_n(x) = \liminf_{n \to \infty} f_n(x) = f(x).
$$

**Why this matters in measure theory:**
1. **Preservation of Measurability:** If each $f_n$ is measurable, the level sets of the envelope functions satisfy:
   $$
   \{x \in X : g_n(x) > \alpha\} = \bigcup_{k=n}^\infty \{x \in X : f_k(x) > \alpha\}.
   $$
   Since a $\sigma$-algebra is closed under countable unions, each $g_n$ is measurable. Taking the infimum over $n$ corresponds to a countable intersection of level sets, proving that $\limsup_{n \to \infty} f_n$ and $\liminf_{n \to \infty} f_n$ are **always measurable functions**.
2. **Foundation for Fatou's Lemma:** The classic bridge bounding the integral of limiting behavior is phrased directly via the pointwise lower envelope:
   $$
   \int_X \left( \liminf_{n \to \infty} f_n \right) d\mu \le \liminf_{n \to \infty} \int_X f_n \, d\mu.
   $$

---

## 3. Limits Superior and Inferior for Sequences of Sets

Now let $(E_n)_{n=1}^\infty$ be a sequence of subsets of a common space $X$. How do we define the limit of a sequence of sets?

In the Boolean lattice of subsets $\mathcal{P}(X)$:
- Union $\bigcup$ plays the role of **supremum** ($\sup$).
- Intersection $\bigcap$ plays the role of **infimum** ($\inf$).

### Formulation 1: The Intersection/Union Formulation

Mimicking the numerical definition, we examine the tail sets.

- **Tail Union:** $S_n = \bigcup_{k=n}^\infty E_k$. These sets shrink: $S_1 \supseteq S_2 \supseteq S_3 \supseteq \cdots$.
- **Tail Intersection:** $I_n = \bigcap_{k=n}^\infty E_k$. These sets expand: $I_1 \subseteq I_2 \subseteq I_3 \subseteq \cdots$.

The limit of a decreasing sequence of sets is their intersection, and the limit of an increasing sequence of sets is their union:

> [!note] Set-Theoretic Inf-Sup Formulation
> For any sequence of sets $(E_n)_{n=1}^\infty$:
> $$
> \limsup_{n \to \infty} E_n = \bigcap_{n=1}^\infty \bigcup_{k=n}^\infty E_k
> $$
> $$
> \liminf_{n \to \infty} E_n = \bigcup_{n=1}^\infty \bigcap_{k=n}^\infty E_k
> $$

### Formulation 2: "Infinitely Often" vs. "Eventually"

Expanding the definitions logically reveals clear set-membership interpretations:

1. **For $\limsup E_n$:**
   $$
   x \in \bigcap_{n=1}^\infty \bigcup_{k=n}^\infty E_k \iff \forall\, n \ge 1, \; \exists\, k \ge n \text{ such that } x \in E_k.
   $$
   This means no matter how large an index $n$ we pick, $x$ belongs to some set $E_k$ beyond $n$. In other words:
   $$
   \limsup_{n \to \infty} E_n = \{x \in X : x \in E_n \text{ for infinitely many } n\} = \{E_n \text{ infinitely often}\} = \{E_n \text{ i.o.}\}.
   $$

2. **For $\liminf E_n$:**
   $$
   x \in \bigcup_{n=1}^\infty \bigcap_{k=n}^\infty E_k \iff \exists\, n \ge 1 \text{ such that } \forall\, k \ge n, \; x \in E_k.
   $$
   This means that past some cutoff index $n$, $x$ belongs to *every* subsequent set $E_k$. In other words:
   $$
   \liminf_{n \to \infty} E_n = \{x \in X : x \in E_n \text{ for all but finitely many } n\} = \{E_n \text{ eventually}\}.
   $$

Because belonging to sets *eventually* implies belonging to them *infinitely often*, the fundamental inclusion holds for all sequences of sets:
$$
\liminf_{n \to \infty} E_n \subseteq \limsup_{n \to \infty} E_n.
$$
If $\liminf E_n = \limsup E_n = E$, we say the sequence converges to $E$ and write $\lim_{n \to \infty} E_n = E$.

### De Morgan Duality

Under complementation, $\limsup$ and $\liminf$ swap roles:
$$
\left(\limsup_{n \to \infty} E_n\right)^c = \liminf_{n \to \infty} E_n^c, \qquad \left(\liminf_{n \to \infty} E_n\right)^c = \limsup_{n \to \infty} E_n^c.
$$
*Proof:* An element is not in $E_n$ infinitely often if and only if it is in $E_n^c$ for all but finitely many $n$.

---

## 4. The Indicator Function Bridge

The parallel between sequences of numbers and sequences of sets is not a mere analogy; it is an exact algebraic isomorphism via **indicator functions** (or characteristic functions).

For any subset $A \subseteq X$, let $\mathbf{1}_A : X \to \{0, 1\}$ be defined by:
$$
\mathbf{1}_A(x) = \begin{cases} 1 & \text{if } x \in A, \\ 0 & \text{if } x \notin A. \end{cases}
$$

> [!important] The Indicator Identity
> For any sequence of sets $(E_n)_{n=1}^\infty$ and every $x \in X$:
> $$
> \mathbf{1}_{\limsup_{n \to \infty} E_n}(x) = \limsup_{n \to \infty} \mathbf{1}_{E_n}(x)
> $$
> $$
> \mathbf{1}_{\liminf_{n \to \infty} E_n}(x) = \liminf_{n \to \infty} \mathbf{1}_{E_n}(x)
> $$

**Derivation:**  
Observe how unions and intersections translate to numerical operations on $\{0, 1\}$:
$$
\mathbf{1}_{\bigcup_{k=n}^\infty E_k}(x) = \sup_{k \ge n} \mathbf{1}_{E_k}(x), \qquad \mathbf{1}_{\bigcap_{k=n}^\infty E_k}(x) = \inf_{k \ge n} \mathbf{1}_{E_k}(x).
$$
Taking the limits with respect to $n$:
$$
\mathbf{1}_{\limsup E_n}(x) = \mathbf{1}_{\bigcap_{n=1}^\infty \bigcup_{k=n}^\infty E_k}(x) = \inf_{n \ge 1} \left( \sup_{k \ge n} \mathbf{1}_{E_k}(x) \right) = \limsup_{n \to \infty} \mathbf{1}_{E_n}(x).
$$
The identity for $\liminf$ follows identically. Hence, taking set limits is pointwise identical to taking numerical $\limsup$ and $\liminf$ of indicator sequences.

---

## 5. Summary: Equivalent Perspectives at a Glance

| Perspective | Number Sequence $(a_n)$ | Set Sequence $(E_n)$ |
| :--- | :--- | :--- |
| **Inf-Sup Form** | $\inf_{n \ge 1} \sup_{k \ge n} a_k$ | $\bigcap_{n=1}^\infty \bigcup_{k=n}^\infty E_k$ |
| **Sup-Inf Form** | $\sup_{n \ge 1} \inf_{k \ge n} a_k$ | $\bigcup_{n=1}^\infty \bigcap_{k=n}^\infty E_k$ |
| **Monotone Tails** | Limit of decreasing tail suprema $s_n$ | Intersection of shrinking tail unions $S_n$ |
| **Heuristic Meaning** | Highest / lowest accumulation values | Occurs infinitely often vs. occurs eventually |
| **$\varepsilon$ / Logical Form** | Frequently $> L - \varepsilon$ and eventually $< L + \varepsilon$ | $\forall n \, \exists k \ge n \, (x \in E_k)$ vs. $\exists n \, \forall k \ge n \, (x \in E_k)$ |
| **Indicator Link** | $\limsup_{n \to \infty} \mathbf{1}_{E_n}(x)$ | Points where indicator evaluates to $1$ |

---

## 6. Measure-Theoretic Payoffs Ahead

Mastering $\limsup$ and $\liminf$ pays immediate dividends throughout measure theory:

1. **Measurability of Limits:** A $\sigma$-algebra $\mathcal{M}$ is closed under countable unions and countable intersections. Therefore, if $E_n \in \mathcal{M}$ for all $n$, then:
   $$
   \limsup_{n \to \infty} E_n \in \mathcal{M} \quad \text{and} \quad \liminf_{n \to \infty} E_n \in \mathcal{M}.
   $$
   Similarly, the pointwise $\limsup f_n$ and $\liminf f_n$ of measurable functions are automatically measurable.
2. **The First Borel–Cantelli Lemma:** If $(E_n)$ are measurable events and $\sum_{n=1}^\infty \mu(E_n) < \infty$, then:
   $$
   \mu\left(\limsup_{n \to \infty} E_n\right) = 0.
   $$
   *Proof Sketch:* By monotonicity of measure and subadditivity, for every $n$:
   $$\mu\left(\limsup E_n\right) \le \mu\left(\bigcup_{k=n}^\infty E_k\right) \le \sum_{k=n}^\infty \mu(E_k).$$
   As $n \to \infty$, the tail sum of a convergent series tends to $0$, forcing $\mu(\limsup E_n) = 0$.
3. **Fatou's Lemma:** For non-negative measurable functions $(f_n)$:
   $$
   \int \liminf_{n \to \infty} f_n \, d\mu \le \liminf_{n \to \infty} \int f_n \, d\mu.
   $$
   Applied to indicator functions $f_n = \mathbf{1}_{E_n}$ on a finite measure space, Fatou's Lemma yields:
   $$
   \mu(\liminf_{n \to \infty} E_n) \le \liminf_{n \to \infty} \mu(E_n) \le \limsup_{n \to \infty} \mu(E_n) \le \mu(\limsup_{n \to \infty} E_n).
   $$
