import React from 'react'

const Section = () => {
  return (
    <section className={`${this.props.name} section`} id={this.props.name}>
      <div className="section__header">
        <h1 className={`section__title ${this.props.gradient}`}>{this.props.title}</h1>
        <span className="section__subtitle">{this.props.subtitle}</span>
      </div>

      <div className={`${this.props.name}__container container grid`}>
        {this.props.children}
      </div>
    </section>
  )
}

export default Section