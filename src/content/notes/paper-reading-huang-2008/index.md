---
title: "Huang et al. (2008) 精读：保修需求、状态设计与 w-dependent base-stock 结构"
description: "逐式精读 Huang, Kulkarni & Swaminathan (2008)：完整写出成本、状态转移、Bellman 递推和主要结构结论；正文保留关键逻辑，定理、证明、扩展与全部数值表可按需展开。"
publishDate: 2026-09-03
updatedDate: 2026-09-04
updates:
  - date: 2026-09-04
    note: "依据含 electronic companion 的完整 PDF 与 Markdown 重写：补齐 L、C、G、终端成本及主要定理原始陈述；加入 Theorem 1、Proposition 2、Proposition 3 的附录证明脉络和完整数值表。"
category: Paper Reading
tags: [inventory, warranty, paper-reading, stochastic-demand, dynamic-programming]
collection: Paper Reading
aliases: ["Huang 2008", "Managing the Inventory of an Item with a Replacement Warranty"]
lang: zh
englishSummary: "A detailed reading of Huang, Kulkarni, and Swaminathan (2008). It reconstructs the operational story, the warranty-age state, the complete one-period cost and Bellman recursion, renewable-warranty terminal liability, finite- and infinite-horizon w-dependent base-stock results, emergency supply, extensions, and all reported numerical comparisons. Long proofs and tables are collapsible, while the main narrative emphasizes why the fixed age-dependent failure-fraction assumption makes the structural result tractable."
paper:
  title: "Managing the Inventory of an Item with a Replacement Warranty"
  authors: ["Wei Huang", "Vidyadhar Kulkarni", "Jayashankar M. Swaminathan"]
  year: 2008
  venue: "Management Science 54(8): 1441–1452"
  doi: "10.1287/mnsc.1080.0863"
readingStatus: Revisit
paperTakeaways:
  story: "过去销售形成未来保修替换需求；本期交付又形成新的在保责任，因此新需求、库存和在保产品群体必须联合规划。"
  state: "年龄状态向量 w 压缩了相关销售历史；在主模型固定失效比例假设下，给定 w 后当期保修替换需求为确定量 β·w。"
  structure: "特殊终端成本把销售期结束后的可再生保修责任定价，使有限期动态规划可分解并得到 w-dependent base-stock 结构。"
  question: "当 β 本身变成随机失效冲击时，原证明中哪些分离与单调性步骤失效，还能保留何种近似结构？"
researchQuestions:
  - id: random-failure-structure-reading
    text: "当固定失效比例 β 被随机失效冲击 β(n) 取代时，Theorem 1 的分解、单调性与反向归纳首先在哪一步失效？"
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

这篇论文值得精读，不是因为它简单地在普通库存需求上“再加一项保修需求”，而是因为它处理了一个更麻烦的反馈：**过去销售决定今天的保修替换压力，今天真正交付出去的产品又进入新的保修群体，从而改变未来需求。** 因此库存状态、在保状态和未来需求并不是三件独立的事情。

这一版笔记采用两层阅读。默认正文只保留故事、状态、关键公式和每个结构结果为什么成立；需要核对原始数学对象时，定理、完整 Bellman 递推、电子附录证明和数值表都可以展开。Reader 左边的 PDF 直接从正式论文第 1441 页开始，并保留后面的 electronic companion；Markdown 也按同一份完整材料清理。正文中的页码按钮可以直接把左侧原文跳到对应位置。

## 一页先读懂：论文究竟做了什么

企业面对两类需求：新客户需求，以及已售产品在保修期内失效产生的免费替换需求。案例中的保修索赔在一些时期超过总需求的 15%，而企业原来的库存计划主要只看新需求，于是出现加急生产、运输和等待成本。:source[1441]

作者的关键建模动作是用年龄向量

$$
w_n=(w_n^1,\ldots,w_n^K)
$$

记录当前仍在保修期内的产品分别有多老。主模型进一步假设，年龄为 $j$ 的产品每期有固定比例 $\beta_j$ 失效。因此一旦 $w_n$ 已知，当期保修替换需求就是确定量

$$
\beta\cdot w_n=\sum_{j=1}^K\beta_jw_n^j,
$$

而当期外生随机性来自新需求 $\zeta_n$。这使“历史依赖”被压缩成有限维状态，并把总需求写成“确定平移 + 随机新需求”。:source[1443]

作者证明：在相应条件下，最优补货仍具有 base-stock 形式，但目标水平不再只是时间的函数，而是 $w$ 的函数。有限期主结果的目标水平为

$$
S_n(w)=\beta\cdot w+F_n^{-1}\!\left(
\frac{\bar p-c(1-\alpha)}{\bar p+h}
\right),
\qquad
\bar p=p-(1-\alpha)m_1.
$$

第一项直接覆盖由当前在保群体决定的替换需求；第二项像一个 newsvendor 分位数，但缺货代价被未来保修责任 $m_1$ 修正。:source[1445] :source[1446]

最值得反复记住的一点是：这个漂亮结构并不是对任意“随机保修需求”都成立。论文在 §8.3 把失效比例本身改成随机向量 $\beta(n)$ 后，明确说前面的最优性结果不再保证成立，只提出了按总需求分布构造的 heuristic。:source[1450]

## 1. 业务故事：为什么售后不是一个外生的第二需求流

论文由一家数字投影仪企业的库存问题驱动。产品在保修期内失效时免费替换，而且替换品重新获得完整保修。企业原来主要按新客户需求备货，保修索赔发生时临时应对。新产品生命周期很短，但过去售出的机器仍在保；如果年龄越大的产品失效率越高，保修需求可以在新销量下降后继续上升。:source[1441]

这和普通“两个独立需求流相加”不同。今天卖出一件产品，未来可能带来保修需求；今天为了保修而交付一件新品，这件新品又开始新的完整保修期。换句话说，一次服务会制造新的未来服务责任。作者因此需要同时描述库存、现场在保产品和新需求。

论文还包含一个信息价值问题：只掌握聚合销量，与进一步掌握在保产品的年龄分布，分别能带来多少价值？2008 这篇论文直接使用完整年龄信息，数值部分再与 Huang et al. (2007) 的聚合近似进行比较。:source[1442]

## 2. 模型骨架：状态、随机量、决策和保修需求

> [!notation id=state | 核心状态与决策]
> $w_n^j$：第 $n$ 期开始时，年龄为 $j$ 且仍在保修期内的产品数量，$j=1,\ldots,K$。
>
> $w_n=(w_n^1,\ldots,w_n^K)$：保修年龄状态向量。
>
> $x_n$：第 $n$ 期开始时库存；允许 $x_n<0$，负值表示 backlog。
>
> $y_n\ge x_n$：下单即时到货后的库存水平，也是第 $n$ 期的决策变量。
>
> $\zeta_n$：第 $n$ 期新客户需求，cdf 为 $F_n$，density 为 $f_n$。
>
> $\beta_j$：年龄为 $j$ 的在保产品在一期内失效的固定比例；$\beta=(\beta_1,\ldots,\beta_K)$。
>
> $c,h,p$：单位采购、持有和 backlog penalty cost；$\alpha$ 为折现因子。 :source[1443]

> [!assumption id=failure | 主模型最关键的可解性假设]
> For each age $j$, a fixed fraction $\beta_j$ of the items at age $j$ under warranty fail in a period. Hence, conditional on $w_n=w$, warranty replacement demand in the current period is $\beta\cdot w$; the new-product demand $\zeta_n$ is the period's exogenous random demand. :source[1443]

这里要特别小心。论文结论部分用了 “Bernoulli trials” 的语言讨论这一假设的局限，但主模型的动态规划实际使用的是**固定失效比例**，因此给定 $w$ 后，$\beta\cdot w$ 在当期是一个确定平移。不要把主模型直接读成“对 $w_j$ 件产品逐个做 Bernoulli 抽样，所以替换量仍是随机变量”。真正把失效比例随机化的是 §8.3。

### 2.1 当期总需求与完整单周期成本

给定状态 $w$，第 $n$ 期总需求为

$$
D_n=\zeta_n+\beta\cdot w.
$$

令 $q=y-\beta\cdot w$，即先从 order-up-to level 中扣掉确定的保修替换需求后，剩给随机新需求的量。论文的持有/缺货期望成本完整写成

$$
L_n(w,y)=
\begin{cases}
\displaystyle
p\int_{y-\beta\cdot w}^{\infty}
(\zeta-y+\beta\cdot w)f_n(\zeta)\,d\zeta
+h\int_0^{y-\beta\cdot w}
(y-\zeta-\beta\cdot w)f_n(\zeta)\,d\zeta,
& y\ge \beta\cdot w,\\[1.2em]
\displaystyle
p\int_0^{\infty}(\zeta-y+\beta\cdot w)f_n(\zeta)\,d\zeta,
& y<\beta\cdot w.
\end{cases}
\tag{1}
$$

采购成本也加进去后，完整的一期成本是

$$
C_n(w,x,y)=c(y-x)+L_n(w,y).
\tag{2}
$$

这两个式子应该放在一起读：$L_n$ 只关心订货后水平 $y$ 对当期需求的覆盖；$C_n$ 再把从原库存 $x$ 拉升到 $y$ 的采购成本加回来。:source[1444]

### 2.2 状态转移：为什么今天的交付会改变未来 demand state

论文的状态转移为

$$
w_{n+1}^1
=\min\{y_n,\beta\cdot w_n+\zeta_n\}+[x_n]^-,
$$

$$
w_{n+1}^j=w_n^{j-1}(1-\beta_{j-1}),
\qquad j=2,\ldots,K,
$$

$$
x_{n+1}=y_n-\zeta_n-\beta\cdot w_n,
\qquad [x]^-=-\min\{x,0\}.
\tag{3}
$$

第二式只是“未失效的旧产品老一岁”。第一式更重要：本期真正履约出去的新产品，无论是新销售还是 warranty replacement，都在下一期变成 age-1 的在保产品；旧 backlog 在本期被补发后也进入这批新的保修责任。因此 $(w_n,x_n)$ 配合决策 $y_n$ 构成 Markov decision process。:source[1444]

> [!details 三种目标函数：有限期折现、无限期折现与平均成本]
> 有限期目标为
> $$
> V_N^{\pi}(w,x)=\mathbb E_\pi\!\left[
> \sum_{n=0}^{N-1}\alpha^n C_n(w_n,x_n,y_n)
> +\alpha^N T(w_N,x_N)
> \mid w_0=w,x_0=x\right],
> $$
> 并令 $V_N(w,x)=\inf_\pi V_N^\pi(w,x)$。
>
> 无限期折现目标为
> $$
> V^{\pi}(w,x)=\mathbb E_\pi\!\left[
> \sum_{n=0}^{\infty}\alpha^n C_n(w_n,x_n,y_n)
> \mid w_0=w,x_0=x\right],\qquad 0\le\alpha<1.
> $$
>
> 无限期平均成本为
> $$
> g^{\pi}(w,x)=\lim_{N\to\infty}\frac1{N+1}
> \mathbb E_\pi\!\left[
> \sum_{n=0}^N C_n(w_n,x_n,y_n)
> \mid w_0=w,x_0=x\right],
> $$
> 在极限存在时定义。 :source[1444]

## 3. 完整 Bellman 递推：大 $G$ 到底是什么

论文定义 $V_{n,N}(w,x)$ 为从第 $n$ 期到终点 $N$ 的最优折现成本；$G_{n,N}(w,x,y)$ 则是在当前状态 $(w,x)$ 下**固定先选 $y$**之后，当期成本加未来最优成本的 action-value。它不是一个口头上的“成本函数”，而是下面这个完整对象：

$$
V_{N,N}(w,x)=T(w,x),
$$

$$
\begin{aligned}
G_{n,N}(w,x,y)
={}&cy-cx+L_n(w,y)\\
&+\alpha\int_0^{y-\beta\cdot w}
V_{n+1,N}\Big(
\beta\cdot w+\zeta+[x]^-,
 w^1(1-\beta_1),\ldots,w^{K-1}(1-\beta_{K-1}),
 y-\beta\cdot w-\zeta
\Big)f_n(\zeta)\,d\zeta\\
&+\alpha\int_{y-\beta\cdot w}^{\infty}
V_{n+1,N}\Big(
 y+[x]^-,
 w^1(1-\beta_1),\ldots,w^{K-1}(1-\beta_{K-1}),
 y-\beta\cdot w-\zeta
\Big)f_n(\zeta)\,d\zeta,
\end{aligned}
\tag{13}
$$

$$
V_{n,N}(w,x)=\min_{y\ge x}G_{n,N}(w,x,y),
\qquad n=0,\ldots,N-1.
$$

两个积分为什么分开？如果 $\zeta\le y-\beta\cdot w$，本期总需求可以全部履约，下一期新进入 age-1 的在保量是 $\beta\cdot w+\zeta+[x]^-$；如果新需求超过剩余库存，真正能交付的量被 $y$ 截断，于是下一期 age-1 在保量变成 $y+[x]^-$。这正是 $G$ 可能比普通库存模型难的原因：**决策 $y$ 不只改变 $x_{n+1}$，也改变未来的 $w_{n+1}$。** :source[1445]

> [!details 把 $G$ 写成“当前成本 + 下一期状态”的紧凑读法]
> 若记
> $$
> \widehat x=y-\beta\cdot w-\zeta,
> $$
> $$
> \widehat w^1=\min\{y,\beta\cdot w+\zeta\}+[x]^-,
> \qquad
> \widehat w^j=w^{j-1}(1-\beta_{j-1}),\ j=2,\ldots,K,
> $$
> 则 (13) 可以概念性地读成
> $$
> G_{n,N}(w,x,y)=C_n(w,x,y)+\alpha\,\mathbb E\big[V_{n+1,N}(\widehat w,\widehat x)\big],
> $$
> 但真正做证明时不能忘记上面的分段积分，因为 $\widehat w^1$ 在“需求是否超过可用库存”两种区域里的表达式不同。

## 4. 终端成本：论文结构证明真正的支点

有限销售期结束并不意味着保修义务结束。作者因此没有简单设 $T=0$，而是先给仍在保的每一台产品计算未来 warranty liability。

> [!proposition id=warranty-liability | Proposition 1 · 未来可再生保修责任]
> Define
> $$
> \theta_i=\beta_i+\sum_{j=i+1}^{K}\alpha^{j-i}\beta_j
> \prod_{d=i}^{j-1}(1-\beta_d),
> \qquad i=1,\ldots,K.
> $$
> If $m_i$ is the total expected discounted warranty cost generated from now onward by an item currently at age $i$, then
> $$
> m_1=\frac{c\theta_1}{1-\alpha\theta_1},
> \qquad
> m_i=c\theta_i+\alpha\theta_i m_1,
> \quad i=2,\ldots,K.
> $$
> Equivalently the recursion is
> $$
> m_i=c\beta_i+\alpha\beta_i m_1+\alpha(1-\beta_i)m_{i+1},\quad i<K,
> $$
> $$
> m_K=c\beta_K+\alpha\beta_Km_1.
> $$
> :source[1445]

中文理解是：一台 age-$i$ 产品可能本期失败，也可能先存活若干期再失败；一旦失败，企业付出替换品采购成本 $c$，而替换品从 age 1 重新开始完整 warranty，于是又带来 $m_1$。这就是 renewable warranty 在终端责任里的递归。

作者据此选择

$$
T(w,x)=m\cdot w+\alpha m_1[x]^- -cx,
\qquad m=(m_1,\ldots,m_K).
\tag{17}
$$

其中 $m\cdot w$ 给期末仍在保的产品定价；$\alpha m_1[x]^-$ 给期末 backlog 将来一旦交付后产生的新 warranty liability 定价；$-cx$ 则相当于按采购价处理剩余库存/期末 backlog。:source[1445]

这一终端成本看起来“特别定制”，但它不是装饰。Theorem 1 后面的文字明确说明：普通 warranty DP 的 $G_{n,N}$ 可能不关于 $y$ 凸；正是这个终端成本允许作者把 $G$ 分解成一个在 $S_n(w)$ 处最小的凸部分，以及一个在阈值以下为常数、阈值以上递增的剩余项。:source[1446]

## 5. 有限期主结果：$w$-dependent base-stock 为什么仍然最优

先定义

$$
\bar p=p-(1-\alpha)m_1,
$$

$$
S_n(w)=\beta\cdot w+F_n^{-1}\!\left(
\frac{\bar p-c(1-\alpha)}{\bar p+h}
\right),
\tag{18}
$$

$$
\bar L_n(w,y)=
 h\int_0^{y-\beta\cdot w}(y-\beta\cdot w-\zeta)f_n(\zeta)d\zeta
 +\bar p\int_{y-\beta\cdot w}^{\infty}(\zeta-y+\beta\cdot w)f_n(\zeta)d\zeta,
\tag{19}
$$

并定义超出基库存阈值时的 excess-cost function

$$
H_N(w,x)=0,
$$

$$
H_n(w,x)=
\begin{cases}
0,&x\le S_n(w),\\
G_{n,N}(w,x,x)-G_{n,N}(w,x,S_n(w)),&x>S_n(w).
\end{cases}
\tag{21}
$$

> [!theorem id=finite-horizon | Theorem 1 · finite-horizon w-dependent base-stock]
> Suppose demands are stochastically increasing in the paper's sense,
> $$
> F_n(x)\ge F_{n+1}(x),\qquad n=0,\ldots,N-2.
> $$
> Then, for $n=0,\ldots,N-1$,
> $$
> \begin{aligned}
> G_{n,N}(w,x,y)
> ={}&c(1-\alpha)y-cx+\bar L_n(w,y)
> +\sum_{i=n+1}^{N-1}\alpha^{i-n}\Delta_i\\
> &+\alpha(m\cdot w)+\alpha m_1[x]^-
> +\alpha(m_1+c)\mu_n\\
> &+\alpha\int_0^{\tau_{n+1}(w,y)}
> H_{n+1}(\widehat w,\widehat x)f_n(\zeta)d\zeta,
> \end{aligned}
> \tag{23}
> $$
> and $y=S_n(w)$ minimizes $G_{n,N}(w,x,y)$; moreover $G_{n,N}$ is increasing in $y$ for $y\ge S_n(w)$. The theorem also establishes the required monotonicity of the $H$-integral and the representation
> $$
> V_{n,N}(w,x)=T(w,x)+\sum_{i=n}^{N-1}\alpha^{i-n}\Delta_i+H_n(w,x).
> \tag{24}
> $$
> Hence the optimal action in state $(w,x)$ is to order up to $S_n(w)$ whenever $x<S_n(w)$, and not order when $x\ge S_n(w)$. :source[1446]

中文看这个定理，最重要的不是记 (23) 的每个常数，而是看它怎样隔离决策变量 $y$：

1. $c(1-\alpha)y+\bar L_n(w,y)$ 是标准 newsvendor 型凸部分，在 $S_n(w)$ 达到最小；
2. 剩下真正麻烦的 future excess term 用 $H_{n+1}$ 表示；
3. 反向归纳证明这个 term 在阈值以下不破坏最优点、阈值以上只会增加；
4. 所以即使完整 $G$ 未必全局凸，也仍可证明其全局最小点是 $S_n(w)$。

这比“证明 $G$ 凸，所以 base-stock”更精细；论文自己也特别强调 $G$ 在 warranty setting 下可能不凸。:source[1446]

> [!details Electronic companion：Theorem 1 的完整证明脉络]
> 附录用 backward induction，通过 Claim 1（$N-1$ 期）和 Claim 2（从 $n$ 推回 $n-1$）证明 Theorem 1。:source[ec29]
>
> **Base case.** 把终端成本 (17) 代入 $G_{N-1,N}$ 后，所有与当前决策 $y$ 有关的部分被整理成
> $$
> (1-\alpha)cy+\bar L_{N-1}(w,y),
> \tag{48}
> $$
> 这是关于 $y$ 的凸函数，最小点就是 $S_{N-1}(w)$。于是
> $$
> V_{N-1,N}(w,x)=T(w,x)+\Delta_{N-1}+H_{N-1}(w,x).
> $$
> 这一步解释了特殊 terminal cost 为什么恰好有用：它把未来 warranty liability 中与 $y$ 纠缠的部分抵消/重组掉。:source[ec29] :source[ec30]
>
> **Induction step.** 假设第 $n$ 期已经有
> $$
> V_{n,N}(w,x)=T(w,x)+\sum_{i=n}^{N-1}\alpha^{i-n}\Delta_i+H_n(w,x),
> $$
> 代回第 $n-1$ 期 Bellman recursion，可得
> $$
> \begin{aligned}
> G_{n-1,N}(w,x,y)
> ={}&c(1-\alpha)y-cx+\bar L_{n-1}(w,y)
> +\sum_{i=n}^{N-1}\alpha^{i-n+1}\Delta_i\\
> &+m\cdot w+\alpha m_1[x]^-
> +\alpha(m_1+c)\mu_{n-1}
> +\alpha\int_0^{\infty}H_n(\widehat w,\widehat x)f_{n-1}(\zeta)d\zeta.
> \end{aligned}
> $$
> 随机需求的 stochastic-increasing 假设给出相邻分位数的顺序，从而使 $\tau_n(w,S_{n-1}(w))\le0$；在 $y=S_{n-1}(w)$ 时，最后的 $H$ 项为零。与此同时，附录继续证明该积分项在 $y\ge S_{n-2}(w)$ 后单调不减。于是 $S_{n-1}(w)$ 仍是全局最优点。:source[ec31]
>
> 最终得到
> $$
> G_{n-1,N}(w,x,S_{n-1}(w))
> =T(w,x)+\sum_{i=n-1}^{N-1}\alpha^{i-n+1}\Delta_i,
> \tag{54}
> $$
> 并恢复同样的 $V=T+\sum\Delta+H$ 结构，从而闭合反向归纳。:source[ec31]

> [!corollary id=stationary-finite | Corollary 1 · i.i.d. 新需求]
> If $F_n=F$ for all finite-horizon periods, then
> $$
> S(w)=\beta\cdot w+F^{-1}\!\left(
> \frac{\bar p-c(1-\alpha)}{\bar p+h}
> \right)
> $$
> is optimal in every period. Thus a stationary $w$-dependent base-stock policy is optimal even in this finite-horizon problem. :source[1446]

论文指出，有限期模型出现 stationary optimal policy 并不常见；这里是特殊 terminal cost 与 i.i.d. 新需求共同产生的结果。$\beta\cdot w$ 是 warranty demand 的直接平移，而 $\bar p=p-(1-\alpha)m_1$ 则反映 backlog 一个新销售时，企业暂时没有承担该销售未来保修成本的效应。:source[1446]

## 6. 无限期：从有限期结构到 discounted / average cost

> [!theorem id=infinite-discounted | Theorem 2 · infinite-horizon discounted cost]
> If $F_n(x)=F(x)$ for all $n\ge0$, then the stationary policy that orders up to
> $$
> S(w)=\beta\cdot w+F^{-1}\!\left(
> \frac{\bar p-c(1-\alpha)}{\bar p+h}
> \right)
> $$
> in state $(w,x)$ minimizes the infinite-horizon discounted cost. :source[1446]

证明思路不是重新解一个无限期 Bellman 方程，而是把已经对任意有限 $N$ 最优的 stationary policy $\pi^*$ 延伸到 $N\to\infty$，并证明 terminal term 消失：

$$
\lim_{N\to\infty}\alpha^N
\mathbb E_{\pi^*}[T(w_N,x_N)\mid w_0=w,x_0=x]=0.
$$

为控制 $w_N$，作者定义矩阵

$$
P=
\begin{bmatrix}
\beta_1&1-\beta_1&0&\cdots&0\\
\beta_2&0&1-\beta_2&\cdots&0\\
\vdots&\vdots&\vdots&\ddots&\vdots\\
\beta_K&0&0&\cdots&0
\end{bmatrix},
$$

并用 $P$ 是 substochastic irreducible matrix、$P^N\to0$、$(I-P)^{-1}=\sum_{n\ge0}P^n$ 来给 $E[w_N]$ 建立统一上界。:source[1447]

在平均成本情形，$\alpha=1$，目标水平进一步简化为

$$
S(w)=\beta\cdot w+F^{-1}\!\left(\frac{p}{p+h}\right).
\tag{30}
$$

> [!proposition id=positive-recurrent | Proposition 2 · Markov chain stability]
> Under the stationary policy $\pi^*$, the process
> $$
> \{(w_n,x_n):n\ge0\}
> $$
> is an irreducible, aperiodic, positive recurrent discrete-time Markov chain. :source[1447]

> [!details Electronic companion：Proposition 2 的 Foster criterion 证明]
> 附录首先把 $S(w_n)$ 代回状态转移，确认 $(w_n,x_n)$ 在 $\pi^*$ 下是 DTMC；随后选择 Foster-Lyapunov test function
> $$
> v(w,x)=|x|+w(I-P)^{-1}e\,b,
> $$
> 其中 $e$ 为全 1 列向量，$b>0$ 取得足够小。:source[ec32]
>
> 证明分别处理 $x\ge0$ 与 $x\le0$。当状态离开某个有限集合 $A$ 后，$v$ 的一期条件漂移严格为负，因此由 Foster's Criterion 得到 positive recurrence。附录的关键不是某个漂亮闭式，而是用 $|x|$ 控制库存/积压尾部、用 $w(I-P)^{-1}e$ 控制整个在保年龄向量。:source[ec32] :source[ec33]

> [!proposition id=average-exists | Proposition 3 · long-run average cost exists]
> Under $\pi^*$,
> $$
> \lim_{N\to\infty}
> \mathbb E_{\pi^*}\!\left[
> \frac1N\sum_{n=0}^{N-1}C_n(w_n,x_n,y_n)
> \mid w_0=w,x_0=x\right]
> $$
> exists for every initial state $(w,x)$. :source[1447]

> [!details Electronic companion：Proposition 3 为什么成立]
> 附录利用 Proposition 2 的 positive recurrence，并进一步证明在任意固定初始状态下，单期成本的期望关于 $n$ 一致有界。起点是
> $$
> \begin{aligned}
> E[C_n(w_n,x_n,y_n)]
> &\le(c+h)E[\max\{x_n,S(w_n)\}]-cE[x_n]\\
> &\quad+p\mu+p\beta\cdot E[w_n].
> \end{aligned}
> $$
> 再利用 $E[w_n]$ 的矩阵上界以及 $x_n$ 在 base-stock policy 下的界，得到一个与 $n$ 无关的有限上界。结合不可约、positive recurrent DTMC，长期平均成本极限存在。:source[ec34] :source[ec35]

> [!theorem id=average-optimal | Theorem 3 · infinite-horizon average cost]
> The stationary $w$-dependent base-stock policy $\pi^*$ minimizes the expected cost per period over the infinite horizon. :source[1447]

这里的证明再次使用 terminal-cost vanishing argument，只是折现情形的 $\alpha^N T$ 被换成 $T/(N+1)$。因此论文实际上形成了一条很整齐的逻辑链：有限期结构 → i.i.d. 下 stationary → 控制 terminal term → 无限期折现；再证明链稳定与平均成本存在 → 无限期平均成本。

## 7. 无 backlog 的 emergency supply 变体

如果不能积压，未满足需求必须从 emergency supplier 以单位成本 $p>c$ 采购。此时

$$
x_{n+1}=\max\{y_n-\beta\cdot w_n-\zeta_n,0\},
$$

$$
w_{n+1}^1=\beta\cdot w_n+\zeta_n,
\qquad
w_{n+1}^j=w_n^{j-1}(1-\beta_{j-1}).
$$

完整 action-value recursion 为

$$
\begin{aligned}
G_{n,N}(w,y)
={}&cy+L(w,y)\\
&+\alpha\int_0^{y-\beta\cdot w}
V_{n+1,N}(\widehat w,y-\beta\cdot w-\zeta)f(\zeta)d\zeta\\
&+\alpha\int_{y-\beta\cdot w}^{\infty}
V_{n+1,N}(\widehat w,0)f(\zeta)d\zeta,
\end{aligned}
\tag{37}
$$

$$
V_{n,N}(w,x)=\min_{y\ge x}G_{n,N}(w,y)-cx.
$$

这里的 $L(w,y)$ 把缺货 penalty 换成 emergency purchase cost；终端成本也变为

$$
T(w,x)=-cx+m\cdot w.
\tag{40}
$$

> [!theorem id=emergency | Theorem 4 · emergency-supply base-stock]
> Under the same stochastic-increasing demand condition, the optimal finite-horizon policy is again $w$-dependent base-stock, now with
> $$
> S_n(w)=\beta\cdot w+F_n^{-1}\!\left(\frac{p-c}{p+h-c}\right).
> \tag{41}
> $$
> The corresponding $G_{n,N}$ is increasing for $y\ge S_n(w)$, and for i.i.d. demand this becomes the stationary target
> $$
> S(w)=\beta\cdot w+F^{-1}\!\left(\frac{p-c}{p+h-c}\right).
> $$
> :source[1448] :source[1449]

一个很漂亮的小结果是：这个 target 不含 $\alpha$。论文指出这是 emergency-supply assumption 的后果。因为所有当期需求都必须立即满足，缺货不再被推到未来，折现因子不再进入这个临界分位数。:source[1449]

## 8. 三个扩展：哪些改变还能保结构，哪个改变直接打断结构

### 8.1 Pro-rata renewable warranty

> [!proposition id=prorata | Proposition 4 · pro-rata warranty liability]
> If a customer pays $r_i$ when an age-$i$ failed item is replaced, define
> $$
> \bar\theta_i=(c-r_i)\beta_i+
> \sum_{j=i+1}^K\alpha^{j-i}(c-r_j)\beta_j
> \prod_{d=i}^{j-1}(1-\beta_d).
> $$
> Then the future discounted warranty liabilities satisfy
> $$
> \bar m_1=\frac{\bar\theta_1}{1-\alpha\theta_1},
> \qquad
> \bar m_i=\bar\theta_i+\alpha\theta_i\bar m_1,
> \quad i=2,\ldots,K.
> $$
> Replacing $m_i$ by $\bar m_i$ in the terminal cost and in $\bar p,S_n(w)$ preserves the earlier structural results. :source[1449]

这里改变的是每次 replacement 的有效成本，而不是状态转移的核心形状，所以证明结构可以“换参数继续用”。

### 8.2 Random warranty expiration

论文允许 age-$j$ 的在保产品只有随机比例 $\delta_j$ 继续到下一年龄，状态转移变成

$$
w_{n+1}^j=w_n^{j-1}(1-\beta_{j-1})\delta_{j-1},
\quad j=2,\ldots,K.
$$

> [!proposition id=expiration | Proposition 5 · random warranty expiration]
> Define
> $$
> \widehat\theta_i=\beta_i+
> \sum_{j=i+1}^{K}\alpha^{j-i}\beta_j
> \prod_{d=i}^{j-1}(1-\beta_d)\delta_d.
> \tag{46}
> $$
> Then the corresponding warranty-liability quantities $\widehat m_i$ are obtained recursively, and the previous results remain valid after substituting these quantities into the terminal cost, $\bar p$ and $S_n(w)$. :source[1450]

这说明“状态老化过程本身有额外随机性”并不必然摧毁整个结构；至少论文考虑的 expiration 方式仍可以被整合进未来 liability。

### 8.3 Random failure fractions：真正断掉原结论的扩展

这一节最值得单独标出来。作者令

$$
\beta(n)=(\beta_1(n),\ldots,\beta_K(n))
$$

成为每期随机失效比例向量，均值仍为 $\beta_i$。论文明确指出：**earlier optimal-policy results fail to hold; there may not be a $w$-dependent optimal policy.** :source[1450]

此时总需求是

$$
D_n=\zeta_n+\beta(n)\cdot w,
$$

其分布记为 $F_{n,w}$。作者给出的自然 heuristic 是

$$
S_n(w)=F_{n,w}^{-1}\!\left(
\frac{\bar p-c(1-\alpha)}{\bar p+h}
\right).
\tag{47}
$$

这里和主模型的区别不是简单地把 $\beta\cdot w$ 换成它的期望。随机 $\beta(n)$ 同时改变当期需求和下一期在保状态，主模型里“给定 $w$ 后保修需求只是一个确定平移”的关键分离消失。论文没有在这一节给出新的结构定理，而是退回 heuristic；这一点比 heuristic 本身更重要。

## 9. 数值实验：69% 与 3.6% 分别在回答什么

实验不是同一个比较的两个数字，而是两个不同问题。

第一问：**如果企业现在只为新需求备货，改成把保修需求也纳入综合库存规划，价值有多大？** 论文报告平均成本改善 69.33%，最大 86.55%。:source[1450]

第二问：**已经知道要考虑保修需求之后，进一步获得完整 warranty-age information，相比聚合近似还能多带来多少？** 论文报告平均 3.6%，最大 13.1%。:source[1451]

因此 69% 不能被读成“年龄信息价值”，而 3.6% 也不能被读成“考虑 warranty 的全部价值”。

> [!details 实验设计、参数与一个值得注意的文本一致性问题]
> 论文写明 $c=2,K=20,\alpha=0.95$，$p\in\{14,16,18,20,22,24,26\}$，$\beta_1\in\{0.01,0.05,0.1,0.15,0.2,0.25,0.3\}$，并令
> $$
> \beta_j=\beta_{j-1}+0.002,\qquad j=2,\ldots,20.
> $$
> 每个 instance 模拟 $N=100$ 期，1,000 次独立 replication，新需求 i.i.d. Uniform$[0,100]$。:source[1450]
>
> 原文参数段列出的 $h$ 是 $0.05,0.1,0.15,0.2,0.25,0.30$，但同页 Figures 3–4 明确使用 $h=0.01$，下一页 Table 2 与 Table 5 也把 $h=0.01$ 列为第一列；而论文声称共有 343 个 instances，恰好是 $7\times7\times7$。因此从全文内部一致性看，$h=0.01$ 实际上显然也进入了实验网格，只是参数段的文字列表没有把它写进去。这是论文文本本身值得做的一个小注记，而不是我们擅自改参数。:source[1450] :source[1451]

### 9.1 Integrated policy vs. current policy

正文最重要的趋势是：缺货 penalty $p$ 越大、failure rate 越大，忽略 warranty demand 的代价越高。图 3 固定不同 $\beta_1$ 看 $p$，图 4 固定不同 $p$ 看 $\beta_1$，两者都显示 improvement 上升。:source[1450] :source[1451]

> [!details Tables 1–3 与 Figures 3–4：综合规划相对 current policy]
> **Table 1 · as a function of $p$**
>
> | $p$ | 14 | 16 | 18 | 20 | 22 | 24 | 26 |
> |---:|---:|---:|---:|---:|---:|---:|---:|
> | Avg. | 63.29 | 65.86 | 68.00 | 69.84 | 71.43 | 72.84 | 74.07 |
> | Max. | 77.18 | 79.55 | 81.49 | 83.06 | 84.43 | 85.57 | 86.55 |
> | Min. | 16.42 | 18.65 | 20.39 | 21.80 | 23.66 | 25.50 | 26.59 |
>
> **Table 2 · as a function of $h$**
>
> | $h$ | 0.01 | 0.05 | 0.10 | 0.15 | 0.20 | 0.25 | 0.30 |
> |---:|---:|---:|---:|---:|---:|---:|---:|
> | Avg. | 3.72 | 3.70 | 3.66 | 3.62 | 3.60 | 3.57 | 3.55 |
> | Max. | 13.07 | 12.99 | 12.81 | 12.36 | 12.30 | 12.15 | 12.08 |
> | Min. | 0.26 | 0.26 | 0.25 | 0.25 | 0.25 | 0.24 | 0.24 |
>
> **Table 3 · as a function of $\beta_1$**
>
> | $\beta_1$ | 0.01 | 0.05 | 0.10 | 0.15 | 0.20 | 0.25 | 0.30 |
> |---:|---:|---:|---:|---:|---:|---:|---:|
> | Avg. | 22.50 | 61.28 | 75.77 | 79.84 | 81.43 | 82.12 | 82.41 |
> | Max. | 28.32 | 68.66 | 81.11 | 84.47 | 85.76 | 86.29 | 86.55 |
> | Min. | 16.42 | 52.30 | 68.92 | 73.71 | 75.71 | 76.53 | 76.84 |
>
> ![Figure 3 · Cost improvement with increasing stockout penalty cost](https://cdn-mineru.openxlab.org.cn/result/2026-09-03/abe11dcd-c2b6-47fa-91b5-8d5baafc143e/9e7a07b59f4e30cad6d57d1573addb4889279643f435c75a6542cf202f1a7d7b.jpg)
>
> ![Figure 4 · Cost improvement with increasing failure rate](https://cdn-mineru.openxlab.org.cn/result/2026-09-03/abe11dcd-c2b6-47fa-91b5-8d5baafc143e/bd9213264fb61094fe573616db7851eb5ae3981e6db0d99d7f7eef7e0af1fe5c.jpg)
>
> 这些表与图来自论文第 1451 页。这里有一个非常醒目的原文现象：Table 2 虽然表头写的是 “Integrated Policy vs. Current Policy”，数值却与后面的 Table 5（“Integrated Policy vs. Approximation”）几乎完全相同。页面原版就是这样排印的，因此这份笔记忠实保留，不自行替论文改表。 :source[1451]

### 9.2 Complete age information vs. aggregate approximation

Huang et al. (2007) 的近似用平均 failure fraction

$$
\beta_{\mathrm{app}}=\frac1K\sum_{j=1}^K\beta_j
$$

以及每期约 $1/K$ 的产品退出保修来压缩年龄结构。2008 论文用同样 base-stock idea 计算该 approximation，再在真实 age-dependent system 中模拟，和掌握完整 $w$ 的 optimal policy 比较。:source[1451]

> [!details Tables 4–6：完整年龄信息相对 approximation]
> **Table 4 · as a function of $p$**
>
> | $p$ | 14 | 16 | 18 | 20 | 22 | 24 | 26 |
> |---:|---:|---:|---:|---:|---:|---:|---:|
> | Avg. | 2.30 | 2.96 | 3.29 | 3.63 | 3.98 | 4.31 | 4.63 |
> | Max. | 7.44 | 8.43 | 9.33 | 10.17 | 11.32 | 12.18 | 13.07 |
> | Min. | 0.24 | 0.29 | 0.32 | 0.36 | 0.38 | 0.43 | 0.47 |
>
> **Table 5 · as a function of $h$**
>
> | $h$ | 0.01 | 0.05 | 0.10 | 0.15 | 0.20 | 0.25 | 0.30 |
> |---:|---:|---:|---:|---:|---:|---:|---:|
> | Avg. | 3.72 | 3.70 | 3.66 | 3.62 | 3.60 | 3.57 | 3.55 |
> | Max. | 13.07 | 12.99 | 12.81 | 12.36 | 12.31 | 12.15 | 12.08 |
> | Min. | 0.26 | 0.26 | 0.25 | 0.25 | 0.25 | 0.24 | 0.24 |
>
> **Table 6 · as a function of $\beta_1$**
>
> | $\beta_1$ | 0.01 | 0.05 | 0.10 | 0.15 | 0.20 | 0.25 | 0.30 |
> |---:|---:|---:|---:|---:|---:|---:|---:|
> | Avg. | 9.95 | 6.99 | 4.06 | 2.22 | 1.19 | 0.65 | 0.36 |
> | Max. | 13.07 | 9.25 | 5.29 | 2.96 | 1.57 | 0.85 | 0.48 |
> | Min. | 6.90 | 4.81 | 2.86 | 1.56 | 0.83 | 0.44 | 0.24 |
>
> 结果说明完整 age information 的平均增益明显小于“是否把 warranty 纳入规划”的增益，而且 $\beta_1$ 越高时，相对 aggregate approximation 的额外价值反而快速下降：Table 6 的平均值从 9.95% 降到 0.36%。论文据此认为，一个设计得当的 aggregate approximation 已经能够吃到 warranty information 的大部分收益。:source[1451]

## 10. 我会怎样记住这篇论文

这篇论文可以压缩成四句话。

**Story.** 售后 replacement demand 不是与销售无关的外生需求；历史交付形成未来服务义务，今天的交付继续创造未来义务。

**State.** 在固定 age-dependent failure fractions 下，$w_n$ 是足够的历史压缩；给定 $w_n$，当期 warranty demand 为 $\beta\cdot w_n$。

**Structure.** 特殊 terminal cost 把销售期之后仍未结束的 renewable-warranty liability 定价，允许 $G$ 被分解成一个 newsvendor-like 凸项和一个具有阈值单调性的 excess term，从而得到 $w$-dependent base-stock policy。

**Boundary.** 当 failure fractions 本身随机化成 $\beta(n)$ 时，论文不再能证明原来的结构，只保留 heuristic。这恰恰指出了主结果的结构边界。:source[1450] :source[1452]

最后还要区分“论文告诉我们的边界”和“我们自己的研究模型”。这里记录的是 Huang et al. (2008) 的模型、证明与其附录；它可以帮助定位哪些假设在结构证明中起作用，但不能把这里的符号或结论自动搬到别的模型里。
