---
title: "Huang et al. (2008) 精读：保修需求如何进入库存状态与最优策略"
description: "从业务故事、状态设计与终端成本出发，完整拆解 Huang, Kulkarni & Swaminathan (2008) 的有限期与无限期理论、电子附录证明、扩展模型和数值实验，并区分论文原意、研究者理解与原文疑点。"
publishDate: 2026-09-03
category: Reading
tags: [inventory, warranty, paper-reading, stochastic-demand, dynamic-programming]
collection: Paper Reading
aliases: ["Huang 2008", "Managing the Inventory of an Item with a Replacement Warranty"]
lang: zh
englishSummary: "This deep reading revisits Huang, Kulkarni, and Swaminathan (2008) from the perspective of an inventory researcher. The central insight is that past sales can be compressed into a warranty-age state vector, while fixed age-dependent failure fractions turn current warranty replacement demand into a state-dependent deterministic shift. Together with a carefully designed terminal cost, this structure restores a w-dependent base-stock policy. The note reconstructs the finite-horizon proof from the electronic companion, follows the discounted- and average-cost arguments, audits several technical ambiguities in the published version, and examines why the optimality result breaks once the failure fractions themselves become random."
paper:
  title: "Managing the Inventory of an Item with a Replacement Warranty"
  authors: ["Wei Huang", "Vidyadhar Kulkarni", "Jayashankar M. Swaminathan"]
  year: 2008
  venue: "Management Science 54(8): 1441–1452"
  doi: "10.1287/mnsc.1080.0863"
readingStatus: Revisit
paperTakeaways:
  story: "Past sales create future warranty replacement demand, so inventory decisions and the installed base cannot be planned separately."
  state: "The warranty-age vector w compresses the relevant sales history; conditional on w, the main model treats warranty failures as the deterministic shift β·w."
  structure: "A specially constructed terminal cost lets the finite-horizon dynamic program recover a w-dependent base-stock policy, which becomes stationary under i.i.d. new demand and extends to infinite-horizon criteria."
  question: "What remains when the fixed failure fractions are replaced by genuinely random, possibly correlated failure shocks that affect both current demand and the next warranty state?"
researchQuestions:
  - id: random-failure-structure-reading
    text: "For this reading: when the fixed aggregate failure fractions β are replaced by random failure shocks β(n), which step of the structural proof fails first, and what policy structure can still be justified?"
    status: Exploring
    kind: Reading
references:
  - id: huang2008
    title: "Managing the Inventory of an Item with a Replacement Warranty"
    authors: "Wei Huang, Vidyadhar Kulkarni, and Jayashankar M. Swaminathan"
    year: 2008
    venue: "Management Science 54(8): 1441–1452"
    doi: "10.1287/mnsc.1080.0863"
draft: false
featured: true
---

这篇笔记现在不再是一篇站点功能示例，而是一份完整的文献精读母稿。我想做的也不是把论文从 Introduction 到 Conclusion 换一种中文说法，而是从一个库存理论研究者的视角重新走一遍作者的思路：为什么这个问题需要新的状态，哪些假设真正支撑了漂亮的策略结构，终端成本为什么如此关键，电子附录里的 backward induction 到底怎样成立，以及当作者在 §8.3 真正把 failure fraction 随机化以后，为什么原来的最优性结果立刻失效。

阅读时我会尽量保持三个层次。凡是关于模型、定理、数值结果和作者自述局限的内容，都尽量忠实于论文；对公式和证明的解释属于我的理解；如果出版版本本身存在疑似笔误、遗漏或技术条件没有写全，我会单独指出，而不会悄悄替作者修正。[Huang et al. (2008)](#ref-huang2008)

## 从售后保修问题到一个真正需要记住历史的库存模型

论文的现实背景来自一家数字投影仪企业。企业承诺，只要产品在保修期内失效，就直接免费替换一台新产品。原来的库存计划却只针对新客户需求，保修索赔来了以后再临时处理。实际数据中，一些时期的 warranty claims 会超过总需求的 15%。同时，这类产品的销售生命周期很短，新需求可能很快上升又快速下降，而较老的在保产品反而具有更高的失效率。于是即使新产品销量已经回落，过去卖出去的产品仍然会继续制造 replacement demand，企业不得不用加急生产、加急运输和更长的客户等待时间来弥补计划不足。 :source[1441]

这个故事真正改变库存模型的地方，并不是简单地“多了一类需求”。普通库存模型常常把需求看成当前的外生随机量，而这里过去的销售会形成一个仍在保修期内的 installed base；这个 installed base 会在未来失效；未来失效又重新形成库存需求。于是过去的销售和当前库存决策会通过保修责任继续影响未来需求。作者在文献综述中也特别强调，这一点与传统 returns / remanufacturing 文献不同：产品退回通常会增加可用供给，而 warranty claim 在本文里增加的是需求。 :source[1442]

为了把这段历史压缩成可用于动态规划的状态，作者定义

$$
w_n=(w_n^1,w_n^2,\ldots,w_n^K),
$$

其中 $w_n^j$ 表示周期 $n$ 开始时，年龄为 $j$ 且仍在保修期内的产品数量。库存状态记为 $x_n$，允许 $x_n<0$ 表示 backlog；当期订货以后库存位置变成 $y_n\ge x_n$。新客户需求为随机变量 $\zeta_n$，分布函数为 $F_n$。 :source[1443]

这里有一个必须读得非常仔细的假设。主模型不是把每一个 warranty failure 都作为一个新的随机 Bernoulli realization 放进状态方程，而是假设年龄为 $j$ 的在保产品中，每一期有一个**固定比例** $\beta_j$ 失效。令

$$
\beta=(\beta_1,\ldots,\beta_K),
$$

那么当期保修替换需求就是

$$
\beta\cdot w_n
=\sum_{j=1}^K\beta_jw_n^j.
$$

> [!assumption id=fixed-failure-fractions] 主模型中真正起作用的 failure assumption
> 给定当前 warranty-age state $w_n$ 后，主模型把 aggregate warranty replacement demand 写成确定量 $\beta\cdot w_n$。作者自己说 fixed-fraction assumption 对保持分析可处理性是关键的；真正随机的 failure fraction $\beta(n)$ 要到 §8.3 才被单独讨论。 :source[1443]

因此主模型的总需求可以写成

$$
D_n=\zeta_n+\beta\cdot w_n.
$$

这意味着，条件于 $w_n$，保修需求只是把新需求分布向右平移了 $\beta\cdot w_n$。这件事后来会直接出现在最优 base-stock level 的第一项中，也是整篇论文能够得到显式结构的关键。

状态转移现在就容易理解了。期末库存满足

$$
x_{n+1}=y_n-\zeta_n-\beta\cdot w_n.
$$

如果右边为负，就是下一期的 backlog。对于年龄 $j=2,\ldots,K$ 的在保产品，上一期年龄为 $j-1$ 且没有失效的产品继续老化，所以

$$
w_{n+1}^j=w_n^{j-1}(1-\beta_{j-1}).
$$

新的 age-1 cohort 则来自本期真正交付出去的产品，再加上期初 backlog 在本期被补交以后新启动的保修责任，因此

$$
w_{n+1}^1
=\min\{y_n,\beta\cdot w_n+\zeta_n\}+[x_n]^-.
$$

有了这些转移，$(w_n,x_n)$ 足以成为 Markov state。过去每一期究竟卖了多少、何时卖的，不需要完整保留；与未来保修需求有关的历史已经被 $w_n$ 压缩进状态。 :source[1443]

单周期成本也有一个很有用的重写。令

$$
q=y-\beta\cdot w,
$$

即满足确定的 warranty replacement demand 后，真正留给随机新需求的库存量。论文中的持有与缺货成本可以写成

$$
L_n(w,y)
=h\,\mathbb E[(q-\zeta_n)^+]
+p\,\mathbb E[(\zeta_n-q)^+],
$$

再加订货成本得到

$$
C_n(w,x,y)=c(y-x)+L_n(w,y).
$$

所以如果完全不考虑未来，这已经是一个被 $\beta\cdot w$ 平移后的 newsvendor。真正困难的地方在于：今天交付出去的产品会进入下一期的 warranty population，从而改变未来 demand-generating process。作者接下来做的全部工作，就是把这部分未来责任重新吸收到一个修正后的临界分位数里。 :source[1443]

## Terminal cost 不是收尾项，而是整篇结构的支点

有限期模型最容易犯的错误，是觉得销售期到了 $N$ 就可以把终端成本设成零。这里不行。销售生命周期结束并不意味着 warranty liability 同时结束。周期 $N$ 时仍然处于保修期内的产品，未来还可能失效，而且本文考虑的是 renewable warranty：一次免费替换会重新启动完整保修期，所以责任甚至可能延续更久。作者因此先计算一台当前年龄为 $i$ 的产品从现在开始带来的全部期望折现保修成本，记为 $m_i$。 :source[1444]

定义

$$
\theta_i
=\beta_i+
\sum_{j=i+1}^{K}
\alpha^{j-i}\beta_j
\prod_{d=i}^{j-1}(1-\beta_d).
$$

这个式子可以直接按路径来读。第一项 $\beta_i$ 表示当前就失败；下一项 $\alpha(1-\beta_i)\beta_{i+1}$ 表示本期存活、下一期失败；再往后就是继续存活若干期后才失败。$\theta_i$ 因而可以理解为从 age $i$ 开始，在剩余保修期内发生一次 failure 的折现权重。

对 $i<K$，一台 age-$i$ 产品本期以比例 $\beta_i$ 失败。企业需要支付一台新产品的成本 $c$，而 replacement 又变成一台新的 age-1 warranty item，所以还产生未来责任 $\alpha m_1$。如果本期没有失败，它下一期进入 age $i+1$，未来成本为 $\alpha m_{i+1}$。因此

$$
m_i
=c\beta_i+\alpha\beta_i m_1
+\alpha(1-\beta_i)m_{i+1},
\qquad i=1,\ldots,K-1,
$$

而最后一个保修年龄满足

$$
m_K=c\beta_K+\alpha\beta_Km_1.
$$

从 $K$ 向前递推。首先

$$
m_K=\beta_K(c+\alpha m_1).
$$

所以

$$
\begin{aligned}
m_{K-1}
&=\beta_{K-1}(c+\alpha m_1)
+\alpha(1-\beta_{K-1})m_K\\
&=\Bigl[\beta_{K-1}
+\alpha(1-\beta_{K-1})\beta_K\Bigr]
(c+\alpha m_1)\\
&=\theta_{K-1}(c+\alpha m_1).
\end{aligned}
$$

继续同样的递推，就得到

$$
m_i=\theta_i(c+\alpha m_1)
=c\theta_i+\alpha\theta_i m_1.
$$

特别地，对 $i=1$ 有

$$
m_1=c\theta_1+\alpha\theta_1m_1,
$$

于是

$$
\boxed{
m_1=\frac{c\theta_1}{1-\alpha\theta_1}
}
$$

以及

$$
\boxed{
m_i=c\theta_i+\alpha\theta_i m_1,
\qquad i=2,\ldots,K.
}
$$

这就是 Proposition 1。正文写得很短，但它其实完成了一个很重要的经济折算：未来所有 renewable-warranty replacements 被折成了今天状态 $w$ 上的一组线性影子成本。 :source[1444]

作者于是构造终端成本

$$
T(w,x)=m\cdot w+\alpha m_1[x]^- -cx.
$$

第一项 $m\cdot w$ 是期末仍在保产品的未来 warranty liability。第二项 $\alpha m_1[x]^-$ 对应期末 backlog：这些需求以后被补交时会成为新的 age-1 产品，因此也会启动未来 warranty liability。最后的 $-cx$ 则把期末库存按采购成本结算；如果 $x>0$，相当于按 $c$ 退回剩余库存，如果 $x<0$，则相当于以 $c$ 补足 backlog。 :source[1444]

这一步不是为了让公式好看而随意挑的 terminal cost。恰恰相反，后面的 stationary finite-horizon result 很大程度上就是由这个终端价值设计出来的。如果换成一般的零终端成本，靠近 horizon 时的策略通常会受到强烈的 end effect，不会自然得到同样的平稳结构。

把未来 warranty burden 吸收进去以后，作者定义修正后的 shortage cost

$$
\bar p=p-(1-\alpha)m_1,
$$

并得到候选 base-stock level

$$
\boxed{
S_n(w)
=\beta\cdot w
+F_n^{-1}\!\left(
\frac{\bar p-c(1-\alpha)}{\bar p+h}
\right).
}
$$

这个式子值得直接按经济含义拆开。第一项 $\beta\cdot w$ 是当前状态已经确定的保修替换需求，第二项才是针对随机新需求的 newsvendor 分位数。临界分位数又不是普通的 $p/(p+h)$，因为今天没有满足一个需求虽然会付出 shortage penalty，却同时推迟了一次新产品交付，也就推迟了新的 warranty liability。换句话说，当前缺货的净损失要扣掉一部分未来保修负担。 :source[1445]

为了描述“库存已经高得无法通过订货调回目标水平”时的额外损失，作者还定义

$$
H_n(w,x)=
\begin{cases}
0,&x\le S_n(w),\\
G_{n,N}(w,x,x)-G_{n,N}(w,x,S_n(w)),&x>S_n(w).
\end{cases}
$$

这个 $H_n$ 是理解 Theorem 1 证明的钥匙。它把价值函数拆成“理想情况下的价值”和“已有库存超过目标水平后无法撤销所造成的 excess cost”。

## Theorem 1：为什么一个未必凸的动态规划仍然有 base-stock 结构

> [!theorem id=huang-theorem-1] Theorem 1 的核心结构
> 如果各期新需求随机递增，即 $F_n(x)\ge F_{n+1}(x)$，那么 $y=S_n(w)$ 全局最小化有限期动态规划中的 $G_{n,N}(w,x,y)$，并且 $G_{n,N}$ 在 $y\ge S_n(w)$ 后随 $y$ 增加。因而在状态 $(w,x)$ 下，最优决策就是订货到 $S_n(w)$。 :source[1446]

如果这里只说“这是标准 convexity argument”，反而会误读论文。作者明确指出，由于 $w$ 的动态演化，完整的 $G_{n,N}(w,x,y)$ 未必对 $y$ 凸。电子附录真正做的是 backward induction，并把复杂的 continuation value 分解成一个标准凸的 newsvendor 部分，加上一个在候选点为零、候选点右侧非递减的未来 excess-cost 部分。 :source[1446]

先看最后一个决策期 $N-1$。动态规划为

$$
G_{N-1,N}(w,x,y)
=c(y-x)+L_{N-1}(w,y)
+\alpha\mathbb E[T(\widehat w,\widehat x)].
$$

需要按 $\zeta$ 是否超过 $y-\beta\cdot w$ 分成两个区域。当

$$
\zeta\le y-\beta\cdot w,
$$

本期需求全部满足，所以

$$
\widehat x=y-\beta\cdot w-\zeta\ge0,
\qquad [\widehat x]^-=0,
$$

并且

$$
\widehat w^1=\beta\cdot w+\zeta+[x]^-.
$$

当

$$
\zeta>y-\beta\cdot w,
$$

出现 backlog，

$$
[\widehat x]^-=\beta\cdot w+\zeta-y,
$$

而本期能够真正交付的数量最多只有 $y$，所以

$$
\widehat w^1=y+[x]^-.
$$

电子附录把这两个区域分别代入 terminal cost。看起来会产生大量 $m_i$、$w_i$、$\beta_i$ 项，但 Proposition 1 正好提供逐年龄的恒等式

$$
c\beta_i
+\alpha\beta_i m_1
+\alpha(1-\beta_i)m_{i+1}
=m_i.
$$

因此对每一个 age cohort，当前 failure cost、replacement 后重新进入 age 1 的 future liability，以及没有失败后继续老化的 future liability，会精确合并成 $m_iw_i$。这就是大段代数最终能够塌缩的原因。电子附录整理以后指出，真正依赖决策 $y$ 的部分只剩

$$
\phi(y)
=c(1-\alpha)y+\bar L_{N-1}(w,y).
$$

令

$$
q=y-\beta\cdot w.
$$

则

$$
\bar L_n(w,y)
=h\mathbb E[(q-\zeta_n)^+]
+\bar p\mathbb E[(\zeta_n-q)^+].
$$

于是

$$
\phi'(y)
=c(1-\alpha)
+hF_n(q)
-\bar p[1-F_n(q)].
$$

整理得到

$$
\phi'(y)
=c(1-\alpha)-\bar p
+(\bar p+h)F_n(q).
$$

令一阶条件等于零，

$$
F_n(q)
=
\frac{\bar p-c(1-\alpha)}{\bar p+h},
$$

所以

$$
q^*
=F_n^{-1}\!\left(
\frac{\bar p-c(1-\alpha)}{\bar p+h}
\right),
$$

从而

$$
y^*=\beta\cdot w+q^*=S_n(w).
$$

并且

$$
\phi''(y)=(\bar p+h)f_n(q)\ge0,
$$

所以这确实是凸部分的全局最小点。论文的 “it is easy to show” 真正展开以后就是这一套 critical-fractile calculation。（电子附录 ec1–ec2）

到这里还不能结束，因为更早的时期还会包含下一期的 excess cost $H_{n+1}$。作者的 induction hypothesis 可以写成

$$
V_{n,N}(w,x)
=T(w,x)
+\sum_{i=n}^{N-1}\alpha^{i-n}\Delta_i
+H_n(w,x),
$$

其中 $\Delta_i$ 收集了与状态 $w$ 无关的周期性常数项。把这个表达式完整代回 $n-1$ 期的 Bellman recursion，使用刚才同样的 $m_i$ 消去关系，得到

$$
\begin{aligned}
G_{n-1,N}(w,x,y)
={}&c(1-\alpha)y-cx+\bar L_{n-1}(w,y)\\
&+\text{与 }y\text{ 无关的项}
+\alpha\mathbb E[H_n(\widehat w,\widehat x)].
\end{aligned}
$$

所以现在只有最后一个问题：未来的 $H_n$ 会不会把最优点从 $S_{n-1}(w)$ 推走？

记

$$
r=\frac{\bar p-c(1-\alpha)}{\bar p+h}.
$$

Theorem 1 假设

$$
F_{n-1}(z)\ge F_n(z),
$$

这意味着后一期需求在一阶随机意义下不小于前一期，因此相同分位概率 $r$ 下

$$
F_{n-1}^{-1}(r)\le F_n^{-1}(r).
$$

在当前候选点

$$
y=S_{n-1}(w),
$$

这条分位数单调性使论文定义的阈值满足

$$
\tau_n(w,S_{n-1}(w))\le0.
$$

由于新需求 $\zeta\ge0$，能够进入下一期 excess-stock region 的积分区间为空，因此

$$
\mathbb E[H_n(\widehat w,\widehat x)]=0
\qquad\text{at }y=S_{n-1}(w).
$$

换句话说，在当前 newsvendor 部分的最优点上，不会额外制造下一期“库存已经高于目标水平”的惩罚。

接着需要证明当 $y$ 超过这个点时，future excess-cost term 不会反而下降。电子附录对

$$
\int_0^{\tau_n(w,y)}
H_n(\widehat w,\widehat x)f_{n-1}(\zeta)\,d\zeta
$$

关于 $y$ 求导，并利用 induction hypothesis 中 $G_{n,N}$ 在 $S_n$ 右侧非递减的性质，得到该导数非负。这里有一个附录没有特别解释的细节：按照 Leibniz rule，移动积分上限本来会产生一个边界项；但在边界上恰好有

$$
\widehat x=S_n(\widehat w),
$$

而 $H_n$ 的定义给出

$$
H_n(\widehat w,S_n(\widehat w))=0,
$$

所以 boundary term 正好消失。（电子附录 ec2–ec4）

因此整个目标函数可以理解成

$$
\underbrace{c(1-\alpha)y+\bar L_{n-1}(w,y)}_{\text{在 }S_{n-1}(w)\text{ 全局最小}}
+
\underbrace{\alpha\mathbb E[H_n]}_{\text{在该点为 0，向右非递减}}.
$$

两部分同时在 $S_{n-1}(w)$ 取得最小值。随后把 $y=S_{n-1}(w)$ 代回，就重新得到

$$
V_{n-1,N}(w,x)
=T(w,x)
+\sum_{i=n-1}^{N-1}\alpha^{i-n+1}\Delta_i
+H_{n-1}(w,x),
$$

所以 induction 的三个 statement 全部传到前一期，Theorem 1 完成。

如果新需求进一步满足 i.i.d.，即 $F_n=F$，那么候选分位数不再依赖时间，得到

$$
\boxed{
S(w)=\beta\cdot w
+F^{-1}\!\left(
\frac{\bar p-c(1-\alpha)}{\bar p+h}
\right).
}
$$

有限期问题因此出现一个 stationary $w$-dependent base-stock policy。作者自己也强调，这在 finite horizon 中并不常见；之所以能够发生，核心正是前面专门构造的 terminal cost 把 horizon 以后的 warranty liability 提前计价了。 :source[1446]

## 从有限期走到无限期：结论漂亮，但证明需要读得更谨慎

在 i.i.d. 新需求下，有限期的最优策略已经不依赖 horizon。Theorem 2 要证明同一策略在 infinite-horizon discounted cost 下仍然最优，本质上只需要把人为加入有限期问题的 terminal cost 在 $N\to\infty$ 时“送走”。

作者构造矩阵

$$
\mathbf P=
\begin{bmatrix}
\beta_1&1-\beta_1&0&\cdots&0\\
\beta_2&0&1-\beta_2&\cdots&0\\
\vdots&\vdots&\vdots&\ddots&\vdots\\
\beta_K&0&0&\cdots&0
\end{bmatrix},
$$

并从状态方程得到

$$
w_{n+1}
\le w_n\mathbf P+\zeta_ne_1+[x_n]^-e_1.
$$

在 stationary base-stock policy 下，

$$
y_n=\max\{x_n,S(w_n)\},
$$

而 $S(w_n)=\beta\cdot w_n+q^*$。因此

$$
x_{n+1}
=y_n-\beta\cdot w_n-\zeta_n
\ge q^*-\zeta_n,
$$

从而

$$
[x_{n+1}]^-
\le(\zeta_n-q^*)^+
\le\zeta_n.
$$

若 $\mu=\mathbb E[\zeta_n]$，就有

$$
\mathbb E[x_n^-]\le\mu.
$$

于是

$$
\mathbb E[w_{n+1}]
\le\mathbb E[w_n]\mathbf P+2\mu e_1,
$$

迭代得到

$$
\mathbb E[w_N]
\le w\mathbf P^N
+2\mu e_1(I+\mathbf P+\cdots+\mathbf P^{N-1}).
$$

在论文使用的非退化情形下，$\mathbf P$ 是 substochastic，$\mathbf P^N\to0$，而

$$
(I-\mathbf P)^{-1}
=\sum_{k=0}^{\infty}\mathbf P^k.
$$

因此 $\mathbb E[w_N]$ 可以被一个与 $N$ 无关的常数控制。再结合 $\mathbb E[x_N^-]\le\mu$，terminal liability 不会随着 horizon 爆炸。由于 $\alpha^N\to0$，有限期 terminal term 消失，所以同一个 stationary policy 也最小化无限期折现成本。 :source[1447]

> [!sidenote]
> 这里的“$\mathbf P$ irreducible”并不是无条件自动成立。如果某些 $\beta_i$ 恰好取 0 或 1，矩阵结构可能退化。严格版本最好直接写清需要的非退化条件，或者只使用真正需要的 spectral-radius / transience 性质。

出版版本在这段证明里有一个值得明确记录的遗漏。Equation (17) 定义的 terminal cost 是

$$
T(w,x)=m\cdot w+\alpha m_1[x]^- -cx,
$$

但 Theorem 2 后面真正界定 $T(w_N,x_N)$ 时只写了 $m\cdot w_N-cx_N$，漏掉了 $\alpha m_1[x_N]^-$。这不会推翻结论，因为前面已经有

$$
\mathbb E[x_N^-]\le\mu,
$$

所以漏掉的项同样 uniformly bounded，乘上 $\alpha^N$ 以后仍然趋于 0。但从 proof audit 的角度，这应该被标出来，而不是默默当作两处公式完全一致。

平均成本部分更需要谨慎。取 $\alpha=1$ 时，stationary base-stock 变成

$$
S(w)=\beta\cdot w+F^{-1}\!\left(\frac{p}{p+h}\right).
$$

由于没有 $\alpha^N$ 帮助终端项自动消失，作者先在 Proposition 2 中证明 under $\pi^*$ 的状态过程 $(w_n,x_n)$ 是 irreducible、aperiodic、positive recurrent Markov chain。正文把证明放在电子附录。 :source[1447]

附录使用 Foster criterion，并构造 Lyapunov function

$$
v(w,x)=|x|+w(I-\mathbf P)^{-1}e\,b,
$$

其中 $e$ 是全 1 列向量，$b>0$ 选择得足够小，使

$$
b<\frac{1}{e_1(I-\mathbf P)^{-1}e}.
$$

这个函数的两部分有很直观的含义。$|x|$ 衡量库存或 backlog 的规模，而

$$
w(I-\mathbf P)^{-1}e
=w(I+\mathbf P+\mathbf P^2+\cdots)e
$$

可以理解成当前 warranty population 在未来各年龄状态中还会贡献多少总暴露量。

当 $x\ge0$ 时，附录得到

$$
\mathbb E[|x_{n+1}|-x_n]
\le F^{-1}\!\left(\frac{p}{p+h}\right)+\mu-x,
$$

而 warranty-state 部分的 drift 满足

$$
\mathbb E\!\left[
 w_{n+1}(I-\mathbf P)^{-1}eb
-w_n(I-\mathbf P)^{-1}eb
\right]
\le
-web+\mu e_1(I-\mathbf P)^{-1}eb.
$$

所以两项相加以后，只要 $x$ 或 $w$ 足够大，drift 就为负。

当 $x\le0$ 时，

$$
\mathbb E[|x_{n+1}|-|x_n|]
\le F^{-1}\!\left(\frac{p}{p+h}\right)+\mu+x,
$$

而 warranty-state drift 多出由 backlog 进入下一期 age-1 cohort 的项。整理后 $x$ 的系数包含

$$
1-e_1(I-\mathbf P)^{-1}e\,b>0,
$$

这正是前面为什么要求 $b$ 足够小。因此当 backlog 的绝对值很大时，drift 同样严格为负。电子附录最终据此使用 Foster criterion 推出 positive recurrence。（电子附录 ec4–ec6）

这里的证明思路很清楚，但出版版本的技术严谨程度明显低于有限期部分。论文直接说系统是 irreducible、aperiodic，并把某个 drift set $A$ 称为 finite set；然而本文允许连续需求密度，固定比例的状态更新也会产生连续状态值，因此严格来说状态空间并不天然是有限或可数的。更现代而稳妥的写法应当把系统视为一般状态空间 Markov chain，在适当的密度正性和非退化条件下证明某个有界集合是 small / petite set，再结合 Foster–Lyapunov drift 得到 positive Harris recurrence。论文引用的 Meyn–Tweedie 理论本身可以支持这样的路线，但正文与附录没有把这层技术条件完全展开。

Proposition 3 接着要证明长期平均成本存在。作者把单周期期望成本上界为

$$
\begin{aligned}
\mathbb E[C_n]
\le{}&(c+h)\mathbb E[\max\{x_n,S(w_n)\}]\\
&-c\mathbb E[x_n]
+p\mu+p\beta\cdot\mathbb E[w_n],
\end{aligned}
$$

随后分别处理 $x_n\ge0$ 和 $x_n\le0$，利用前面已经得到的 $\mathbb E[w_n]$ 与库存状态界，说明 $\mathbb E[C_n]$ 可以被一个不依赖 $n$ 的有限常数控制。（电子附录 ec6–ec7）这里真正的数学逻辑应理解为：positive recurrence / ergodicity 加上 cost integrability 使长期平均成本能够由稳态分布控制，而不只是“单期成本有界”这一句话本身。

Theorem 3 最后再把有限期结果送到 infinite-horizon average cost。所需的关键极限是

$$
\frac{1}{N+1}
\mathbb E[T(w_N,x_N)]\to0.
$$

因为 terminal liability 被统一控制，所以除以 horizon 后消失。出版版本在这里又像 Theorem 2 一样，展开 $T$ 时漏掉了 backlog warranty-liability term；同样地，$\mathbb E[x_N^-]\le\mu$ 足以把这一项补回，所以结论可以修复，但证明文本本身并非逐字无缺。 :source[1447]

## Emergency supply 与三类扩展：哪些结构真的稳，哪些一放松就坏

§7 把 backlog 换成 emergency supply。库存不足时不再留下负库存，而是立刻从紧急供应商以单位成本 $p>c$ 补足。因此

$$
x_{n+1}
=\max\{y_n-\beta\cdot w_n-\zeta_n,0\},
$$

terminal cost 也变成

$$
T(w,x)=-cx+m\cdot w,
$$

因为系统里不再存在 backlog。作者得到新的 base-stock

$$
\boxed{
S_n(w)=\beta\cdot w
+F_n^{-1}\!\left(\frac{p-c}{p+h-c}\right).
}
$$

这个临界分位数也可以直接推出来。仍令 $q=y-\beta\cdot w$，与 $y$ 有关的核心成本为

$$
\psi(y)
=cy+(h-c)\mathbb E[(q-\zeta)^+]
+p\mathbb E[(\zeta-q)^+].
$$

于是

$$
\psi'(y)
=c+(h-c)F(q)-p[1-F(q)]
=c-p+(p+h-c)F(q).
$$

令一阶条件为零，

$$
F(q)=\frac{p-c}{p+h-c},
$$

就得到上面的 $S_n(w)$。Theorem 4 的 backward induction 没有引入新的证明技术：仍然定义 excess-cost function $H_n$，仍然利用随机递增需求保证在候选 base-stock 点未来 $H$ 为零，并证明向右非递减。正文只展开了最后一期，然后说后面的 induction 与 Theorem 1 相同；严格补全时，就是把前一节的结构逐项换成 emergency-supply 的 $\psi(y)$ 与新的 critical fractile。 :source[1448]

§8 的三个扩展则非常值得从“结构能不能活下来”这个角度看。

Pro-rata renewable warranty 下，age $i$ 的产品失败以后，客户支付 $r_i$，所以企业每次 replacement 的净成本从 $c$ 变成 $c-r_i$。令 $\bar m_i$ 表示新的未来 warranty liability，就有

$$
\bar m_i
=(c-r_i)\beta_i
+\alpha\beta_i\bar m_1
+\alpha(1-\beta_i)\bar m_{i+1}.
$$

因此 Proposition 4 与 Proposition 1 完全同构，只是把各条 failure path 上的 $c$ 换成 $c-r_j$。论文随后说只要在 terminal cost、$\bar p$ 和 $S_n(w)$ 中把 $m_i$ 换成 $\bar m_i$，前面的结构继续成立。 :source[1449]

这里出版版本出现了一个很明显的不等号疑点。既然 $r_i\ge0$，那么企业承担的 replacement cost 不会比 free replacement 更高，所以正常应有

$$
\bar m_1\le m_1.
$$

原文却写成 $\bar m_1\ge m_1$。从 Proposition 4 自己的递推也可以看出这个方向应当反过来。后面“pro-rata warranty 的 base-stock 更高”这一经济结论仍然可以成立：较低的 future warranty liability 会提高当前满足需求的相对价值，从而提高有效的 critical fractile。也就是说，这里更像是一个不等号的出版错误，而不是整段经济结论都反了。

Warranty expiration 扩展又引入随机比例 $\delta_i$，表示 age-$i$ 产品中有多少比例能够继续保持 warranty status。状态转移写成

$$
w_{n+1}^{j}
=w_n^{j-1}(1-\beta_{j-1})\delta_{j-1}.
$$

作者随后给出 Proposition 5，但这里原文存在比前一个不等号更值得警惕的疑点。论文称 $\hat m_i$ 是 expected discounted **cost**，而给出的 $\hat\theta_i$ 却只由 failure / survival probabilities 构成，随后公式直接写成类似

$$
\hat m_i=\hat\theta_i+\alpha\theta_i\hat m_1,
$$

在量纲上就不一致。同时 $\delta_i$ 前面被定义为带密度 $g$ 的随机变量，动态规划也对 $\delta$ 积分，但 Proposition 5 的 $\hat\theta_i$ 又直接使用 $\delta_i$，没有说明究竟是 realized value、期望还是条件结果。 :source[1450]

> [!sidenote]
> 这里我不把自己的修复写成“论文公式”。如果采用最自然的独立随机解释，并令 $\bar\delta_i=\mathbb E[\delta_i]$，那么更一致的递推会是 $\hat m_i=c\beta_i+\alpha\beta_i\hat m_1+\alpha(1-\beta_i)\bar\delta_i\hat m_{i+1}$。这是依据模型做的重构，不是 Huang et al. 原文已经证明的结果。

真正决定这篇论文理论边界的是 §8.3。作者此时才令 failure fraction 本身变成随机向量

$$
\beta(n)=(\beta_1(n),\ldots,\beta_K(n)),
$$

于是当期总需求成为

$$
D_n=\zeta_n+\beta(n)\cdot w.
$$

然后作者非常明确地说：前面关于 optimal policies 的结果不再成立，甚至可能不存在原来那种 $w$-dependent optimal policy。于是他们只提出一个 heuristic：先求给定 $w$ 时总需求 $D_n$ 的分布 $F_{n,w}$，再令

$$
\boxed{
S_n(w)
=F_{n,w}^{-1}\!\left(
\frac{\bar p-c(1-\alpha)}{\bar p+h}
\right).
}
$$

这就是 Equation (47)。 :source[1450]

为什么 Theorem 1 不能简单地把 $F_n$ 换成 $F_{n,w}$ 然后继续？问题不只是“需求分布复杂了一点”。固定 $\beta$ 时，$\beta\cdot w$ 是给定状态后的确定 shift，因此 current cost 里的 warranty demand 和 next-state 里的 warranty evolution 可以借助 $m_i$ 递推进行精确整理。随机 $\beta(n)$ 以后，同一个 failure shock 同时决定当前 replacement demand

$$
\beta(n)\cdot w
$$

和下一期 warranty-age composition。于是随机性同时进入 current cost 与 continuation state，原来那种把未来 liability 线性折叠并在候选点令 $H$ 消失的结构一般不再成立。Equation (47) 更接近“用当前总需求分布做一个修正 newsvendor”的合理策略，而不是从完整 Bellman equation 推导出的最优策略。

这一节还有一个文字层面的不严谨。原文称所有 $\beta_i(n)$ 是 i.i.d.，随后又允许它们的均值为年龄相关的 $\beta_i$。如果所有 $i,n$ 真正共同 i.i.d.，均值不可能随 $i$ 变化。更自然的理解应该是：对每个固定年龄 $i$，序列 $\{\beta_i(n)\}_n$ 随时间独立同分布，其均值为 $\beta_i$；不同年龄可以拥有不同分布。

## 数值实验：69% 和 3.6% 回答的是两个完全不同的问题

论文的 computational study 使用 $K=20$、$c=2$、$\alpha=0.95$，新需求在每一期都服从 $U[0,100]$。每个参数实例模拟 $N=100$ 个周期，并做 1,000 次独立 replication。作者改变 shortage penalty $p$、holding cost $h$ 和初始 failure fraction $\beta_1$，并设置

$$
\beta_j=\beta_{j-1}+0.002,
\qquad j=2,\ldots,20,
$$

以制造随年龄上升的 failure rate。正文说总共有 343 个实例，也就是 $7^3$ 个组合。 :source[1450]

这里有一个很小但明确的参数记录疑点。正文列出的 $p$ 有 7 个值，$\beta_1$ 有 7 个值，但文字里的 $h$ 只列出 0.05 到 0.30 的 6 个值；后面的表格与 Figure 说明却明确出现 $h=0.01$。因此最合理的解释是实验实际用了 7 个 $h$，正文参数列表漏写了 0.01。

更重要的是，实验其实在回答两个完全不同的问题。

| 比较 | 对照策略真正缺少什么 | 论文报告的主要结果 | 应该怎样理解 |
| --- | --- | ---: | --- |
| Integrated policy vs. current policy | current policy 几乎只为 new demand 备货，忽略 warranty demand | 平均改善 69.33%，最大 86.55% | “把 warranty 纳入计划”本身价值很大 |
| Complete age information vs. approximation | approximation 已经考虑 warranty，只是把年龄异质性压缩成 aggregate failure rate | 平均改善约 3.6%，最大约 13.1% | “精确知道年龄分布”的额外边际价值小得多 |

第一组 benchmark 很弱，所以 69% 不能被理解成“复杂 age-state policy 相对一个已经很聪明的 warranty policy 仍然提升 69%”。current policy 基本忽略 warranty demand，而现实数据中 warranty claims 在某些时期本来就超过总需求的 15%。因此随着 shortage penalty $p$ 上升、failure rate 上升，integrated planning 的价值快速增加是完全合理的。Table 1 中 $p$ 从 14 增长到 26 时，平均改善从 63.29% 上升到 74.07%；Table 3 中 $\beta_1$ 从 0.01 增加到 0.30 时，平均改善从 22.5% 上升到 82.41%。 :source[1451]

第二组 comparison 的管理含义反而更细。Huang et al. (2007) 的 approximation 已经知道 warranty 会发生，只是不保留完整 warranty-age distribution，而是使用平均 failure rate，并近似每期有固定比例的产品退出保修。完整 age information 相对这类聪明 approximation 的平均改善约 3.6%，最大约 13.1%。因此“需要规划 warranty demand”和“值得不值得投资昂贵系统追踪每一个在保产品的年龄”是两个完全不同的问题。作者自己的结论也是，大部分 warranty information 的价值能够由 smart approximate policy 获取，而额外追踪 age distribution 的技术投资需要结合成本来判断。 :source[1451]

Table 6 还有一个值得仔细解释的现象。当 $\beta_1=0.01$ 时，完整 age information 相对 approximation 的平均改善约 9.95%；当 $\beta_1=0.30$ 时只剩约 0.36%。这并不应简单解释成“failure rate 越高，年龄信息越没价值”。实验始终把相邻年龄 failure rate 的绝对差固定为 0.002。因此当基准 failure rate 很低时，年龄之间的相对异质性很大；当基准已经接近 0.30 时，再增加 0.002 只是很小的相对变化。真正下降的是**年龄异质性的相对重要性**，所以 aggregate approximation 变得越来越准确。

出版版本的表格本身也有一个明显的内部不一致。Table 2 标题写的是 Integrated Policy vs. Current Policy，但其中关于 $h$ 的数值大约只有 3.5%–3.7%，几乎与 Table 5 的 Integrated Policy vs. Approximation 完全相同，又与同一节明确报告的 69.33% 平均改善不协调。仅凭现有 PDF 无法可靠恢复 Table 2 原本应有的数据，因此最稳妥的做法是记录这个 published-table inconsistency，而不是自己补一个“正确 Table 2”。 :source[1451]

## 最后怎样理解这篇论文

如果把整篇文章重新放回一条研究逻辑，我认为它最漂亮的地方不是最终的 base-stock 公式，而是三个设计选择彼此配合得非常紧。

第一，作者用 warranty-age vector $w$ 把过去销售形成的历史压缩成一个 Markov state。第二，在主模型中，固定 age-dependent failure fractions 使给定 $w$ 后的 warranty demand 变成确定 shift $\beta\cdot w$。第三，作者用 terminal cost $T(w,x)$ 把 horizon 以后仍存在的 renewable-warranty liability 提前计价。三者结合以后，一个原本具有强历史依赖的动态规划重新露出了 newsvendor critical-fractile 结构。

> [!sidenote]
> 这也是为什么我现在不会把这篇论文概括成“随机保修需求下证明了 base-stock policy”。更准确的说法是：**新需求是随机的，warranty population 随历史动态演化，但主模型在给定当前 $w$ 后把 aggregate failure demand 处理成确定的 $\beta\cdot w$。** 真正的随机 failure fraction 出现在 §8.3，而在那里作者自己承认最优性结果失效。

从论文原意看，作者证明了 finite-horizon backlogging model 中的 $w$-dependent base-stock policy；在 i.i.d. 新需求和特殊 terminal cost 下，该策略在有限期中已经平稳，并进一步延伸到 infinite-horizon discounted 和 average-cost criteria；emergency supply 版本保留相同类型的结构；而 random failure fractions 只得到 heuristic。作者在 Conclusion 也明确承认，现实中 assembly defect 或 common supplied part defect 可能让一批产品在接近时间内一起失效，因此需要更一般的 warranty returns model；他们同时没有处理 repair / remanufacturing。 :source[1452]

从我的理解看，这篇论文真正证明的是一个**由特定 information structure 和 failure structure 支撑的结构定理**。漂亮结果并不是 warranty inventory 天生就有 base-stock policy，而是因为 history 可以被 $w$ 压缩、failure demand 在当前状态下可以被写成确定平移、未来 warranty liability 又能被 terminal cost 线性折叠。只要其中一环改变，证明就可能从根部变化。

而从继续研究的角度，最自然的问题也因此变得非常具体：如果 failure shock 在给定 $w$ 后仍然具有不可忽略的条件随机性，甚至存在 batch-level correlation，那么同一个 shock 会同时改变当前 replacement demand 和未来 warranty state。此时 Theorem 1 中最关键的 cancellation、$H_n$ 在候选点为零的性质，以及 state-dependent shift 的解释都需要重新检查。§8.3 已经告诉我们 Equation (47) 是一个很合理的起点，但论文没有证明它在这种更一般的随机模型下有怎样的最优性或近似保证。

所以如果以后只想用几句话重新想起 Huang et al. (2008)，我更愿意记住下面这段，而不是记住某一个定理编号：过去的销售会通过在保产品群体制造未来需求；$w$ 把这段历史压成状态；固定 $\beta$ 把当前 warranty demand 变成一个 state-dependent deterministic shift；特殊 terminal cost 把未来 warranty liability 吸收进今天的 critical fractile；因此动态规划恢复了 $w$-dependent base-stock structure。也正因为如此，一旦 $\beta$ 本身真正随机，原来的结构性证明就不再自动成立。
