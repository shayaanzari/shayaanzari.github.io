---
title: "Metric Topology and Set-Theoretic Limits"
description: "Foundational topology on ℝⁿ and limits of sets needed for measure theory"
section: "Prerequisites"
date: "2026-10-10"
draft: true
---

# Metric Topology & Set Limits

Measure theory extends the intuitive notions of length, area, and volume to general subsets of $\mathbb{R}^n$ and abstract spaces. Before defining outer measures and $\sigma$-algebras, we review the essential topological and set-theoretic apparatus.

## 1. Topology on $\mathbb{R}^n$

Recall that $\mathbb{R}^n$ is equipped with the standard Euclidean metric:
$$
d(x, y) = \|x - y\| = \sqrt{\sum_{i=1}^n (x_i - y_i)^2}.
$$

An open ball centered at $x \in \mathbb{R}^n$ of radius $r > 0$ is defined by:
$$
B_r(x) = \{y \in \mathbb{R}^n : d(x, y) < r\}.
$$

A set $U \subseteq \mathbb{R}^n$ is open if for every $x \in U$, there exists $r > 0$ such that $B_r(x) \subseteq U$.

> [!note] Open Sets in $\mathbb{R}$
> Every open subset of $\mathbb{R}$ can be expressed uniquely as a countable union of disjoint open intervals. This decomposition will be crucial when constructing Lebesgue outer measure.

## 2. Limits of Sequences of Sets

Let $(E_k)_{k=1}^\infty$ be a sequence of subsets of a space $X$. We define:

$$
\limsup_{k \to \infty} E_k = \bigcap_{n=1}^\infty \bigcup_{k=n}^\infty E_k = \{x \in X : x \in E_k \text{ for infinitely many } k\}
$$

$$
\liminf_{k \to \infty} E_k = \bigcup_{n=1}^\infty \bigcap_{k=n}^\infty E_k = \{x \in X : x \in E_k \text{ for all but finitely many } k\}
$$

If $\limsup_{k \to \infty} E_k = \liminf_{k \to \infty} E_k = E$, we say the sequence converges to $E$ and write $\lim_{k \to \infty} E_k = E$.
